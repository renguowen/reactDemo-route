/**
 * Created by Elliott on 2017/3/22.
 */
import {LOGIN, SIGNUP, USERLOGIN, CHECKALL, TOGGLECHECKED, CLEANCHECDED,
LOGOUT,WINDOWRELOAD,ADDITEM,UPDATE,SAVE,FETCH,CHECKITEM,DELETEITEM}from '../actions/actionCreators'
import {combineReducers} from 'redux'

// const rootReducer = combineReducers({posts, comments});


const rootReducer = function (state, action) {
    let arr= state.todos.slice();
    switch (action.type) {
        case LOGIN:
            console.log(LOGIN);
            return Object.assign({}, state, {value: action.value});
        case LOGOUT:
            console.log(LOGOUT);
            return Object.assign({}, state, {currentUser:null});

        
        case SIGNUP:
            console.log(SIGNUP);
            return Object.assign({}, state, {value: action.value});
        case USERLOGIN:
            console.log(USERLOGIN);
            return Object.assign({}, state, {currentUser: action.user});

        case CHECKALL:
            console.log(CHECKALL);
            if (state.isAll) {
                arr.map((todo)=> {
                    todo.isDone = false;
                });
            } else {
                arr.map((todo)=> {
                    todo.isDone = true;
                });
            }
            return Object.assign({}, state, {todos: arr,isAll:(!state.isAll)});

        case TOGGLECHECKED:
            console.log(TOGGLECHECKED);
            arr.map((todo)=> {
                todo.isDone = !todo.isDone;
            });
            return Object.assign({}, state, {todos: arr});

        case CLEANCHECDED:
            console.log(CLEANCHECDED);
            let todoArr = arr.filter((todo)=> {
                return !todo.isDone
            });
            return Object.assign({}, state, {todos: todoArr});

        case ADDITEM:
            console.log(ADDITEM);
            arr.push(action.newTodoItem);
            return Object.assign({}, state,{todos:arr});


        case DELETEITEM:
            console.log(DELETEITEM);
            arr.splice(action.index, 1);
            return Object.assign({}, state,{todos:arr});

        case SAVE:
            console.log(SAVE);
            return Object.assign({}, state, {todoId:action.todoId});
        case UPDATE:
            console.log(UPDATE);
            return state;
        case FETCH:
            console.log(FETCH);
            return Object.assign({}, state, {todoId:action.todoId,todos:action.todos});

        case CHECKITEM:
            console.log(CHECKITEM);
            arr[action.index].isDone=action.isDone;
            return  Object.assign({}, state,{todos:arr});

        default:
            return state;
        //[...state, newItem]state为数组
    }
}
export default rootReducer;