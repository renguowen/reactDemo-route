/**
 * Created by Elliott on 2017/3/18.
 */
import React from 'react';
import {Checkbox, Button } from 'antd';

class Footer extends React.Component{

    cleanHandle(){
        this.props.cleanChecked();
    };

    checkAllHandle(){
        this.props.checkAll();
    }

    toggleHandle(){
        this.props.toggleChecked();
    }

    render(){
        return(
        <div>
            <label>
            <Checkbox checked={this.props.isAll} onClick={this.checkAllHandle.bind(this)} />全选
            </label>
            <Button type="primary" size="small" onClick={this.toggleHandle.bind(this)}>反选</Button>
            <Button type="danger" size="small" onClick={this.cleanHandle.bind(this)}>清除所选</Button>
        </div>
        )
    }
}
export  default Footer;
    