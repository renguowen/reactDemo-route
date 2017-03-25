/**
 * Created by Elliott on 2017/3/16.
 */
import React from 'react';
import ReactDom from 'react-dom';

import LoginS from'./components/login/LoginS';

// import App from'./components/app';
import AppS from'./containers/app';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './store';


import './css/index.css'

// ReactDom.render(
//     <Component1/>,
//     document.getElementById('content')
// );

ReactDom.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={LoginS}/>
                <Route path="/app" component={AppS}/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);


//没装Babel,react时的方法
// var greeter=require('./components/Component1.js');
//
// document.getElementById('content').appendChild(greeter());