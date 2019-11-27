import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AppTab from './AppTab';
import Advertise from './container/Advertise';
import Login from './container/Login';
import Forget from './container/Forget';
import Register from './container/Register';
import ResetPwd from './container/ResetPwd';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Advertise} />
                    <Route path='/login' component={Login} />
                    <Route path='/apptab' component={AppTab} />
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                </Switch> 
            </Router>
        )
    }
}
