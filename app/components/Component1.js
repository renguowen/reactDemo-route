import React from 'react';
import Str from '../data/str.json';
import styles from '../css/component1.css';


class Component1 extends React.Component {
    render() {
        return (
            <div className={styles.root}>{Str.greetText}</div>
        )
    }
}

//导出组件
export default Component1;

// var config = require('./config.json');
//
// module.exports = function() {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// };