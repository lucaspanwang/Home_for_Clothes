import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Tab from './Tab'
import Table1 from './Table1'
import Table2 from './Table2'
import Body from './Body'
import Muxing from './Muxing'
export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route path='/' component={Tab} />
                <Route path='/table1' component={Table1} />
                <Route path='/table2' component={Table2} />
                <Route path='/table3' component={Table2} />
                <Route path='/muxing' component={Muxing} />
                <Route path='/index.html' component={Body} />
                <Route path='/index' component={Body} />
            </div> 
        </Router>
        )
    }
}
