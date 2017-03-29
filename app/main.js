/**
 * Created by Elliott on 2017/3/16.
 */
import React from 'react';
import ReactDom from 'react-dom';

import Login from'./components/login/Login';
import './css/index.styl'

import App from'./containers/app';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';

ReactDom.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={Login}/>
                <Route path="/app" component={App}/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);

