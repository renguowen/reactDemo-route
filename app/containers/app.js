/**
 * Created by Elliott on 2017/3/23.
 */
import React from 'react';
import HeaderS from '../components/HeaderS.js';
import ListS from '../components/ListS.js';
import FooterS from '../components/FooterS';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        if (this.props.currentUser == null) {
            return (
                <Redirect to={'/'}/>
            )
        } else {
            return (
                <div>
                    <HeaderS/>
                    <ListS/>
                    <FooterS/>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

const AppS = connect(
    mapStateToProps
)(App)
export default AppS;