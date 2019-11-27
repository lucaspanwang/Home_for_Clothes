import React, { Component } from 'react';
import AppTab from './AppTab';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Detail from './Detail';
// import Diary from './Diary';

export default class App extends Component {
    render() {
        return (
            <div>                   
                <Router>
                    <AppTab/>    
                    <Switch>
                        {/* <Route exact path='/' component={Diary}/>
                        <Route path='/diary' component={Diary}/> */}
                        <Route path='/detail' component={Detail}/>
                    </Switch>           
                </Router>           
            </div>            
        )
    }
}