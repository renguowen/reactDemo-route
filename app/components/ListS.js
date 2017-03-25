/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import ItemS from './ItemS.js';
import { connect } from 'react-redux'
import {saveOrUpdate,fetch} from '../actions/actionCreators'

class List extends React.Component{
    componentDidUpdate() {
        console.log("update......................")
        this.props.saveOrUpdate()
    }
    componentWillMount(){
        this.props.f(this.props.currentUser);
    }

    render(){
        if(this.props.todos.length == 0) {
            return (
                <div className="empty">目前没有待办任务</div>
            )
        } else {
            return (
                <ul className="list">
                    {
                        this.props.todos.map((item,index) => {
                             // return  <li key={index}>{item.text}</li>;
                            return <ItemS isDone={item.isDone} text={item.text} index={index} key={index} />
                            //{...this.props} 用来传递UL的todoList属性和delete、change方法。
                        })
                    }
                </ul>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    todos:state.todos,
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
    f:(user)=>{
        dispatch(fetch(user));
    },
    saveOrUpdate:()=>{
        dispatch(saveOrUpdate());
    }
})
const ListS= connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
export default ListS;