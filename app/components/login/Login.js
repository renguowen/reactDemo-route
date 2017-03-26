
import React from 'react'
import {Form, Icon, Input, Button, Radio} from 'antd';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login,signUp,userLogin} from'../../actions/actionCreators'
const FormItem = Form.Item;

class LF extends React.Component{
    
    render() {
        const {getFieldDecorator} = this.props.form;
        let text = this.props.value == 1 ? '注册' : '登陆';
        const RadioGroup = Radio.Group;

        if (this.props.currentUser!=null) {
            return (
                <Redirect to={'/app'}/>
            )
        }else{
            return (
                <div className="Login">
                    <h1>React_TodoMVC-router-redux</h1>
                    <RadioGroup value={this.props.value} onChange={this.props.onChange}>
                        <Radio value={1}>注册</Radio>
                        <Radio value={2}>登入</Radio>
                    </RadioGroup>
                    <Form onSubmit={this.props.onSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {text}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            );
        }
    }
}

const lf = Form.create()(LF);

const mapStateToProps = (state) => ({
    value: state.value,
    currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch)=>({
    onSubmit:(e)=>{
        e.preventDefault();
        let userName=e.target.elements[0].value;
        let password=e.target.elements[1].value;
        dispatch(userLogin(userName,password));
    },
    onChange:(e)=>{
        if(e.target.value==1){dispatch(signUp())}
        if(e.target.value==2){dispatch(login())}
    }
})
const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(lf)
export default Login
