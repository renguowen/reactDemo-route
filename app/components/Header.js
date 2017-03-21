/**
 * Created by Elliott on 2017/3/17.
 */
import React from 'react';
import {Input,Button}from 'antd';

class Header extends React.Component {
    // 绑定键盘回车事件，添加新任务
    handlerKeyUp(e) {
        if(e.keyCode == 13) { // enter键的 keyCode 为13
            let value = e.target.value;
            if(!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            };
            e.target.value = '';
            this.props.addItem(newTodoItem); // 通过 this.props 来调用父组件传递过来的addTodo方法
        }
    };

    render(){
        return (
            <div>
                <span>欢迎：{this.props.currentUser.username}</span>
                <Button type="primary" size="small" onClick={this.props.logout.bind(this)}>登出</Button>
                <Input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
    }
}
export default Header // 将TodoHeader导出，否则父组件无法导入