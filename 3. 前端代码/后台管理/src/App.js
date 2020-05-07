import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Tab from './Tab'
import Table1 from './Table1'
import Table2 from './Table2'
import Table3 from './Table3'
import Table4 from './Table4'
import Table5 from './Table5'
import Body from './Body'
import Muxing from './Muxing'
import Add from './Add'
import Login from './Login'
import Addoffice from './Addoffice';
import Huifu from './Huifu';
import Fankuixiangqing from './Fankuixiangqing';
export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
               <Route exact path='/login' component={Login} />
                <Route path='/tab' component={Tab} />
                <Route path='/tab/table1' component={Table1} />
                <Route path='/tab/table2' component={Table2} />
                <Route path='/tab/table3' component={Table3} />
                <Route path='/tab/table4' component={Table4} />
                <Route path='/tab/table5' component={Table5} />
                <Route path='/tab/muxing' component={Muxing} />
                <Route path='/index.html' component={Body} />
                <Route path='/tab/index' component={Body} />
                <Route path='/tab/tianjia' component={Add} />
                <Route path='/tab/tianjiaxiaoxi' component={Addoffice} />
                <Route path='/tab/huifu/:id' component={Huifu} />
                <Route path='/tab/fankuixiangqing/:id' component={Fankuixiangqing} />
            </div> 
        </Router>
        )
    }
}
