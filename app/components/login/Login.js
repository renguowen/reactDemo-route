/**
 * Created by Elliott on 2017/3/19.
 */
import React from 'react'
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

let LF= React.createClass({
    handleSubmit:function(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.loginOrSignUp(values)
            }
        });
    },
    render:function () {
        const {getFieldDecorator} = this.props.form;
        let text = this.props.value == 1 ? '注册' : '登陆'
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {text}
                    </Button>
                </FormItem>
            </Form>
        );
    },
})

const Login = Form.create()(LF);
export default Login