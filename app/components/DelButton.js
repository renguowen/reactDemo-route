/**
 * Created by Elliott on 2017/3/17.
 */
import React from 'react';
import style from '../css/index.css';

class DelButton extends React.Component{
    handlerDelete() {
        this.props.deleteItem(this.props.index);
    }
    render(){
        return(
            <button className={style.display_none} onClick ={this.handlerDelete.bind(this)}>del</button>
        )
    }
}
export  default DelButton;