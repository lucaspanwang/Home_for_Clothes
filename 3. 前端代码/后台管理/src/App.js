import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Tab from './Tab'
import Table1 from './Table1'
import Table2 from './Table2'
import Table3 from './Table3'
import Table4 from './Table4'
import Body from './Body'
import Muxing from './Muxing'
import Add from './Add'
import Addoffice from './Addoffice';
export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route path='/' component={Tab} />
                <Route path='/table1' component={Table1} />
                <Route path='/table2' component={Table2} />
                <Route path='/table3' component={Table3} />
                <Route path='/table4' component={Table4} />
                <Route path='/muxing' component={Muxing} />
                <Route path='/index.html' component={Body} />
                <Route path='/index' component={Body} />
                <Route path='/tianjia' component={Add} />
                <Route path='/tianjiaxiaoxi' component={Addoffice} />
            </div> 
        </Router>
        )
    }
}
