/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import {Checkbox, Button } from 'antd';
import { connect } from 'react-redux'
import {checkAll,toggleChecked,cleanChecked} from '../actions/actionCreators'

class Footer extends React.Component{

    render(){
        return(
            <div>
                <label>
                    <Checkbox checked={this.props.isAll} onClick={this.props.checkAll}/>全选
                </label>
                <Button type="primary" size="small" onClick={this.props.toggleChecked}>反选</Button>
                <Button type="danger" size="small" onClick={this.props.cleanChecked}>清除所选</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
   isAll: state.isAll
})

const mapDispatchToProps = (dispatch) => ({
    checkAll:()=>{
        dispatch(checkAll());
    },
    toggleChecked:()=>{
        dispatch(toggleChecked());
    },
    cleanChecked:()=>{
        dispatch(cleanChecked());
    },
})
const FooterS= connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
export  default FooterS;
    