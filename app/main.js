/**
 * Created by Elliott on 2017/3/16.
 */
import React from 'react';
import ReactDom from 'react-dom';

import App from'./components/app.js';


import './css/index.css'

// ReactDom.render(
//     <Component1/>,
//     document.getElementById('content')
// );
ReactDom.render(
    <App/>,
    document.getElementById('app')
);



//没装Babel,react时的方法
// var greeter=require('./components/Component1.js');
//
// document.getElementById('content').appendChild(greeter());