/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import {Input,Button}from 'antd';
import { connect } from 'react-redux'
import {addItem,logout} from '../actions/actionCreators'


class Header extends React.Component {
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
                <Button type="primary" size="small" onClick={this.props.logout}>登出</Button>
                <Input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    addItem:(item)=>{
        dispatch(addItem(item));
    },
    logout:()=>{
        dispatch(logout());
    }
})
const HeaderS= connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
export default HeaderS // 将TodoHeader导出，否则父组件无法导入