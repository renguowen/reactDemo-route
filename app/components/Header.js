/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import {Input, Button}from 'antd';
import {connect} from 'react-redux'
import {addItem, logout} from '../actions/actionCreators'


class HeaderUI extends React.Component {
    handlerKeyUp(e) {
        if (e.keyCode == 13) {
            let value = e.target.value;
            if (!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            };
            e.target.value = '';
            this.props.addItem(newTodoItem);
        }
    };

    render() {
        return (
            <div className="Header">
                <div className="welcome">
                    <span>欢迎：{this.props.currentUser.username}</span>
                    <Button type="primary" size="small" onClick={this.props.logout}>登出</Button>
                </div>
                <Input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    addItem: (item)=> {
        dispatch(addItem(item));
    },
    logout: ()=> {
        dispatch(logout());
    }
})
const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderUI)
export default Header