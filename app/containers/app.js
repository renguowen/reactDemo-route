/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import Header from '../components/Header.js';
import List from '../components/List.js';
import Footer from '../components/Footer';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

class AppUI extends React.Component {
    render() {
        if (this.props.currentUser == null) {
            return (
                <Redirect to={'/'}/>
            )
        } else {
            return (
                <div>
                    <Header/>
                    <List/>
                    <Footer/>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const App = connect(
    mapStateToProps
)(AppUI)
export default App;