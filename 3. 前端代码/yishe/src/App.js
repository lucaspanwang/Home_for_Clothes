import React, { Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AppTab from './AppTab';
import Advertise from './login/Advertise';
import Login from './login/Login';
import Forget from './login/Forget';
import Register from './login/Register';
import ResetPwd from './login/ResetPwd';
import ShequArticle from './community/Article';
import ShequTab from './ShequTab';
import ZhengliTab from './ZhengliTab';
import RijiTab from './RijiTab';
import GerenTab from './GerenTab';
import Setup from './me/Setup';
import AboutMe from './me/AboutMe';
import AboutUs from './me/AboutUs';
import Insert from './store/Insert';
import Add from './store/Add';
import Home from './store/Home';
import Robe from './store/Robe';
import Trunk from './store/Trunk';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Advertise} />
                    <Route path="/shequtab" component={ShequTab} />
                    <Route path="/zhenglitab" component={ZhengliTab} />
                    <Route path="/rijitab" component={RijiTab} />
                    <Route path="/gerentab" component={GerenTab} />
                    <Route path='/login' component={Login} />
                    <Route path='/apptab' component={AppTab} />
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                    <Route path="/shequarticle" component={ShequArticle} />
                    <Route path="/setup" component={Setup} />
                    <Route path="/aboutme" component={AboutMe} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path='/insert' component={Insert} />
                    <Route path='/add' component={Add} />
                    <Route path='/home' component={Home} />
                    <Route path='/robe' component={Robe} />
                    <Route path='/trunk' component={Trunk} />
                    
                
                </Switch> 
            </Router>
        )
    }
}
