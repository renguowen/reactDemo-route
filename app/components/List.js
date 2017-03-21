/**
 * Created by Elliott on 2017/3/17.
 */
import React from 'react';
import Item from './Item.js';

class List extends React.Component{
    componentDidUpdate() {
        this.props.saveOrUpdateTodos()
    }
    render(){
        if(this.props.todoList.length == 0) {
            return (
                <div className="empty">目前没有待办任务</div>
            )
        } else {
            return (
                <ul className="list">
                    {
                        this.props.todoList.map((item,index) => {

                            // return  <li key={index}>{item.text}</li>;
                            return <Item oneItem={item} index={index} {...this.props} key={index}/>
                            //{...this.props} 用来传递UL的todoList属性和delete、change方法。
                        })
                    }
                </ul>
            )
        }
    }
}

export default List;