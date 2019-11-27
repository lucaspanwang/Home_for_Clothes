import React, { Component } from 'react';
import AppTab from './AppTab';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Shequ from './shequ/Shequ';
import Chuanda from './Chuanda';
import Zhenglixiang from './Zhenglixiang';
import Riji from './Riji';
import Geren from './geren/Geren';
import ShequArticle from './shequ/ShequArticle';
import { Switch } from 'antd-mobile';

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Shequ} />
                        <Route path="/shequ" component={Shequ} />
                        <Route path="/chuanda" component={Chuanda} />
                        <Route path="/zhenglixiang" component={Zhenglixiang} />
                        <Route path="/riji" component={Riji} />
                        <Route path="/geren" component={Geren} />
                        <Route path="/shequarticle" component={ShequArticle} />
                    </Switch>
                    
                </Router>
                <AppTab />
            </div>
        )
    }
}
