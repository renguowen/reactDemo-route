/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Checkbox, Button } from 'antd';
import { connect } from 'react-redux'
import {checkItem,deleteItem} from '../actions/actionCreators'


class Item extends React.Component{
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.checkItem(this.props.index, isDone);
    }
    handlerDelete() {
        this.props.deleteItem(this.props.index);
    }
    handlerMouseIn () {
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block'
    }
    handlerMouseOut () {
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none'
    }
    render(){

        return (
            <li onMouseOver={this.handlerMouseIn.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                <Checkbox checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
                <span>{this.props.text}</span>
                <Button ref="delButton" type="danger" size="small" onClick={this.handlerDelete.bind(this)}>删除</Button>
            </li>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    currentUser: state.currentUser,
    index:ownProps.index,
    isDone:ownProps.isDone,
    text:ownProps.text
})

const mapDispatchToProps = (dispatch) => ({
    checkItem:(index,isdone)=>{
        dispatch(checkItem(index,isdone));
    },
    deleteItem:(index)=>{
        dispatch(deleteItem(index));
    }
})
const ItemS= connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)
export default ItemS;