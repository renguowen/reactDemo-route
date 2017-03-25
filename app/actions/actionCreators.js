/**
 * Created by Elliott on 2017/3/22.
 */
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const USERLOGIN = 'USERLOGIN';
export const CHECKALL = 'CHECKALL';
export const TOGGLECHECKED = 'TOGGLECHECKED';
export const CLEANCHECDED = 'CLEANCHECDED';
export const LOGOUT = 'LOGOUT';
export const WINDOWRELOAD = 'WINDOWRELOAD';
export const ADDITEM = 'ADDITEM';
export const SAVE='SAVE';
export const UPDATE='UPDATE';
export const FETCH='FETCH';
export const CHECKITEM='CHECKITEM';
export const DELETEITEM='DELETEITEM';


import AV from 'leancloud-storage'
const appId = 'cRIIzODS5m4XnKmV0vT8fY7e-gzGzoHsz';
const appKey = '6GPjbxmhxiQtcSq08PUXrjFJ';
AV.init({appId, appKey});

const getCurrentUser = function () {
    let current = AV.User.current();
    if (current) {
        let {id, createdAt, attributes: {username}} = current;
        return {id, username, createdAt}
    } else {
        return null
    }
}


export function addItem(value) {
        return {
            type: ADDITEM,
            newTodoItem: value
        }
}


export function checkAll() {
    return {
        type: CHECKALL
    }
}
export function toggleChecked() {
    return {
        type: TOGGLECHECKED
    }
}
export function cleanChecked() {
    return {
        type: CLEANCHECDED
    }
}


export function login() {
    return {
        type: LOGIN,
        value: 2
    }
}
export function logout() {
    AV.User.logOut()
    return {
        type: LOGOUT
    }
}
export function windowReload() {
    return {
        type: WINDOWRELOAD
    }
}

export function signUp() {
    return {
        type: SIGNUP,
        value: 1
    }
}
export function userLogin(userName, password) {
    return function (dispatch, getState) {
        if (getState().value === 1) {
            let user = new AV.User();
            user.setUsername(userName);
            user.setPassword(password);
            user.signUp().then((loginedUser) => {
                let user = {id: loginedUser.id, username: loginedUser.attributes.username};
                dispatch({
                    type: USERLOGIN,
                    user: user
                })
            }, function (error) {
                alert(error);
            })
        } else if (getState().value === 2) {
            console.log("执行登陆")
            AV.User.logIn(userName, password).then((loginedUser) => {
                let user = {id: loginedUser.id, username: loginedUser.attributes.username};
                dispatch({
                    type: USERLOGIN,
                    user: user
                })
            }, function (error) {
                alert(error);
            });
        }
    }
}

export function saveOrUpdate() {
    return function (dispatch, getState) {
        if(getState().todoId){
            let dataString = JSON.stringify(getState().todos)
            let avTodos = AV.Object.createWithoutData('ToDoList', getState().todoId)
            avTodos.set('content', dataString)
            avTodos.save().then((todo)=>{
                console.log('更新成功')
                dispatch({
                  type:UPDATE
                })
            })
        } else {
            let dataStr=JSON.stringify(getState().todos);
            let AVData=AV.Object.extend('ToDoList');
            let avData=new AVData();

            avData.set('content',dataStr);
            avData.set('userId',getState().currentUser.id);
            avData.save().then((todo)=>{
                console.log('保存成功');
                dispatch({
                    type:SAVE,
                    todoId:todo.id
                })
            },function (err) {
                alert(err);
            })
        }
    }
}
export function fetch(currentUser) {
    return function (dispatch, getState) {
        if (currentUser) {
            var query = new AV.Query('ToDoList');
            query.equalTo('userId', currentUser.id);
            query.find().then((todoList) => {

                let avAllTodos = todoList[0]// 因为理论上一个用户建一条数据使用，所以我们取结果的第一项
                let id = avAllTodos.id;
                let todos=JSON.parse(avAllTodos.attributes.content)
                console.log(todos);
                dispatch({
                    type:FETCH,
                    todos:todos,
                    todoId:id
                })
            }, function (error) {
                console.error(error)
            })
        }
    }
}
export  function checkItem(index,isDone) {  
    return {
        type:CHECKITEM,
        index:index,
        isDone:isDone
    }
}
export  function deleteItem(index) {
    return {
        type:DELETEITEM,
        index:index
    }
}