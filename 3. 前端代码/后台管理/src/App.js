import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './login/Login'
import Tab from './Tab'

export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route path='/tab' component={Tab} />
            </div> 
        </Router>
        )
    }
}
