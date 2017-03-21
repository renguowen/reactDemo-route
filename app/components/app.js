/**
 * Created by Elliott on 2017/3/17.
 */
import React from 'react';
import Header from './Header.js';
import List from './List.js';
import Footer from './Footer.js';
import Login from'./login/Login.js';

import {Radio} from 'antd';
import AV from 'leancloud-storage'

const appId = 'cRIIzODS5m4XnKmV0vT8fY7e-gzGzoHsz';
const appKey = '6GPjbxmhxiQtcSq08PUXrjFJ';
AV.init({appId, appKey});


class App extends React.Component { //定义组件，继承父类
    constructor() {//constructor 是和 class 一起用来创建和初始化对象的特殊方法。
        super();//在装载组件(mounting)之前调用会React组件的构造函数。当实现React.Component子类的构造函数时，应该在任何其他语句之前调用super(props)
        this.state = {//设置初始状态
            todos: [],
            isAll: false,
            currentUser: null,
            value: 1,
            todoId:null
        }
    };

    // 绑定键盘回车事件，添加新任务
    addItem(item) { // 新增了添加todo事项的方法
        this.state.todos.push(item);
        this.gotoRender(this.isAllChecked());  //设置状态
    };

    deleteItem(index) {
        this.state.todos.splice(index, 1);
        this.gotoRender(this.isAllChecked());
    };

    checkItem(index, isDone) {
        //操作其中一个todo
        this.state.todos[index].isDone = isDone;
        this.gotoRender(this.isAllChecked());
    };

    toggleChecked() {//反选
        this.state.todos.map((todo)=> {
            todo.isDone = !todo.isDone;
        });
        this.gotoRender(this.isAllChecked());
    };

    checkAll() {
        if (this.state.isAll) {
            this.state.todos.map((todo)=> {
                todo.isDone = false;
            });
        } else {
            this.state.todos.map((todo)=> {
                todo.isDone = true;
            });
        }
        this.gotoRender(this.isAllChecked());
    }

    cleanChecked() {
        let todos = this.state.todos.filter((todo)=> {
            return !todo.isDone
        });
        this.state.todos = todos;
        this.gotoRender(this.isAllChecked());
    };

    isAllChecked() {
        let isAll = false;
        if ((this.state.todos.length > 0) && this.state.todos.every(todo => todo.isDone)) {
            isAll = true;
        }
        return isAll;
    };

    gotoRender(isAll) {
        if (isAll) {
            this.setState({
                todos: this.state.todos,
                isAll: true
            });
        } else {
            this.setState({
                todos: this.state.todos,
                isAll: false
            });
        }
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    //获取当前用户
    getCurrentUser() {
        let current = AV.User.current();
        console.log(current);
        if (current) {
            let {id, createdAt, attributes: {username}} = current
            return {id, username, createdAt}
        } else {
            return null
        }
    }

    //登出用户
    logout() {
        AV.User.logOut()
        this.state.currentUser = null
        window.location.reload()
    }

    //登陆或者注册
    loginOrSignUp(values) {
        //判断是登陆还是注册
        if (this.state.value === 1) {
            let user = new AV.User();
            user.setUsername(values.userName);
            user.setPassword(values.password);
            user.signUp().then((loginedUser) => {
                this.state.currentUser = this.getCurrentUser()
                this.setState({currentUser: this.state.currentUser})
            }, function (error) {
                alert(error);
            })
        } else if (this.state.value === 2) {
            console.log("执行登陆")
            AV.User.logIn(values.userName, values.password).then((loginedUser) => {
                this.state.currentUser = this.getCurrentUser();
                this.setState({currentUser: this.state.currentUser});
                this.fetchTodos()
            }, function (error) {
                alert(error);
            });
        }
    }

    //保存到服务器
    saveToServer(){
        let dataStr=JSON.stringify(this.state.todos);
        let AVData=AV.Object.extend('ToDoList');
        let avData=new AVData();

        avData.set('content',dataStr);
        avData.set('userId',this.state.currentUser.id);
        avData.save().then((todo)=>{
            console.log(todo);
            console.log('保存成功');
            this.state.todoId = todo.id;
            this.setState({todoId:this.state.todoId})

        },function (err) {
            alert(err);
        })
    }
    //更新todo到服务器上
    updateServer() {
        let dataString = JSON.stringify(this.state.todos)
        let avTodos = AV.Object.createWithoutData('ToDoList', this.state.todoId)
        avTodos.set('content', dataString)
        avTodos.save().then((todo)=>{
            console.log(todo);
            console.log('更新成功')
        })
    }
    //判断应该更新或储存list到leanCloud
    saveOrUpdateTodos() {
        if(this.state.todoId){
            this.updateServer()
        } else {
            this.saveToServer()
        }
    }
    //读取服务器数据
    fetchTodos() {
        if(this.state.currentUser){
            var query = new AV.Query('ToDoList');
            query.equalTo('userId',this.state.currentUser.id);
            query.find().then((todoList) => {
                    console.log(todoList);
                    let avAllTodos = todoList[0]// 因为理论上一个用户建一条数据使用，所以我们取结果的第一项
                    let id = avAllTodos.id
                    this.state.todos = JSON.parse(avAllTodos.attributes.content)
                    this.state.todoId = id
                    this.setState({todos:this.state.todos,todoId:this.state.todoId})
                }, function(error){
                    console.error(error)
                })
        }
    }

    render() {
        if (!this.state.currentUser) { // 判断是否已经登录
            const RadioGroup = Radio.Group;
            return (
                <div>
                    <h1>React-Todos</h1>
                    <RadioGroup value={this.state.value} onChange={this.onChange.bind(this)}>
                        <Radio value={1}>注册</Radio>
                        <Radio value={2}>登入</Radio>
                    </RadioGroup>
                    <Login loginOrSignUp={this.loginOrSignUp.bind(this)} value={this.state.value}/>
                </div>
            )
        } else {
            return (
                <div>
                    <Header addItem={this.addItem.bind(this)} currentUser={this.state.currentUser}
                            logout={this.logout.bind(this)}/>
                    <List todoList={this.state.todos} deleteItem={this.deleteItem.bind(this)}
                          checkItem={this.checkItem.bind(this)} saveOrUpdateTodos={this.saveOrUpdateTodos.bind(this)}/>
                    <Footer isAll={this.state.isAll} cleanChecked={this.cleanChecked.bind(this)}
                            checkAll={this.checkAll.bind(this)} toggleChecked={this.toggleChecked.bind(this)}/>
                </div>
            )
        }
    }
}

export default App;