/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import Item from './Item.js';
import { connect } from 'react-redux'
import {saveOrUpdate,fetch} from '../actions/actionCreators'

class ListUI extends React.Component{
    componentDidUpdate() {
        console.log("update......................")
        this.props.saveOrUpdate()
    }
    componentWillMount(){
        this.props.fetch(this.props.currentUser);
    }

    render(){
        if(this.props.todos.length == 0) {
            return (
                <div>目前没有待办任务</div>
            )
        } else {
            return (
                <ul className="List_ul">
                    {
                        this.props.todos.map((item,index) => {
                            return <Item isDone={item.isDone} text={item.text} index={index} key={index} />
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
    fetch:(user)=>{
        dispatch(fetch(user));
    },
    saveOrUpdate:()=>{
        dispatch(saveOrUpdate());
    }
})
const List= connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUI)
export default List;