/**
 * Created by Elliott on 2017/3/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import DelButton from './DelButton.js';
import {Checkbox, Button } from 'antd';

class Item extends React.Component{
    handlerChange() {
        let isDone = !this.props.oneItem.isDone;
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
                <Checkbox checked={this.props.oneItem.isDone} onClick={this.handlerChange.bind(this)}/>
                <span>{this.props.oneItem.text}</span>
                <Button ref="delButton" type="danger" size="small" onClick={this.handlerDelete.bind(this)}>删除</Button>
            </li>
        )
    }
    
}
// <button onClick={this.handlerDelete.bind(this)}>del</button>
// <DelButton ref="delButton" index={this.props.index}  {...this.props}/>
export default Item;