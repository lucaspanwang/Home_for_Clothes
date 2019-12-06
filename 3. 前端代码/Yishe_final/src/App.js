import React, { Component} from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
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
import DiaryAdd from './diary/DiaryAdd';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Advertise} />
                    <Route path='/login' component={Login} />
                    {/* <Route path="/shequtab" component={ShequTab} />
                    <Route path="/zhenglitab" component={ZhengliTab} />
                    <Route path="/rijitab" component={RijiTab} />
                    <Route path="/gerentab" component={GerenTab} />
                    <Route path='/apptab' component={AppTab} /> 
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                    <Route path="/shequarticle/:id" component={ShequArticle} />
                    <Route path="/setup" component={Setup} />
                    <Route path="/aboutme/:id" component={AboutMe} />
                    <Route path="/aboutus" component={AboutUs} />
                    <Route path='/insert' component={Insert} />
                    <Route path='/add' component={Add} />
                    <Route path='/home' component={Home} />
                    <Route path='/robe' component={Robe} />
                    <Route path='/trunk' component={Trunk} />
                    <Route path='/diaryadd' component={DiaryAdd} />*/}
                    <Route path="/shequtab/:id" component={ShequTab} />
                    <Route path="/zhenglitab/:id" component={ZhengliTab} />
                    <Route path="/rijitab/:id" component={RijiTab} />
                    <Route path="/gerentab/:id" component={GerenTab} />
                    <Route path='/apptab/:id' component={AppTab} />
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                    <Route path="/shequarticle/:id" component={ShequArticle} />
                    <Route path="/setup/:id" component={Setup} />
                    <Route path="/aboutme/:id" component={AboutMe} />
                    <Route path="/aboutus/:id" component={AboutUs} />
                    <Route path='/insert/:id' component={Insert} />
                    <Route path='/add/:id' component={Add} />
                    <Route path='/home/:id' component={Home} />
                    <Route path='/robe/:id' component={Robe} />
                    <Route path='/trunk/:id' component={Trunk} />
                    <Route path='/diaryadd/:id' component={DiaryAdd} />
                </div> 
            </Router>
        )
    }
}
