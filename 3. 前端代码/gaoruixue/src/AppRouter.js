import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Detail from './Detail';

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>    
                    <Switch>
                        <Route exact path='/' component={Diary}/>
                        <Route path='/detail' component={Detail}/>
                    </Switch>           
                </Router> 
            </div>
        )
    }
}

