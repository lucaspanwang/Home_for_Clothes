import React, { Component} from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AppTab from './AppTab';
import Advertise from './login/Advertise';
import Login from './login/Login';
import Forget from './login/Forget';
import Register from './login/Register';
import ResetPwd from './login/ResetPwd';
import ShequArticle from './community/Article';
import Review from './community/Review';
import Office from './community/Office';
import ShequTab from './ShequTab';
import ZhengliTab from './ZhengliTab';
import GerenTab from './GerenTab';
import XiaoxiTab from './XiaoxiTab';
import Setup from './me/Setup';
import AboutMe from './me/AboutMe';
import AboutUs from './me/AboutUs';
import Insert from './store/Insert';
import Add from './store/Add';
import Home from './store/Home';
import Robe from './store/Robe';
import Trunk from './store/Trunk';
import Customize from './store/Customize'
import DiaryAdd from './me/diary/DiaryAdd';
import DiarySearch from './me/diary/DiarySearch';
import Diary from './me/diary/Diary';
import ArticleAdd from './community/ArticleAdd';
import MyArticle from './me/MyArticle';
import MyClothing from './me/MyClothing';
import MyCare from './me/MyCare';
import MyFan from './me/MyFan';
import MyCollect from './me/MyCollect';
import Name from './me/Name.js';
import City from './me/City.js';
import Info from './me/Info.js';
import Sex from './me/Sex';
import Pretty from './wear/Pretty'
import OfficeArticle from './community/OfficeArticle';
import Chat from './message/Chat/Chat';
import Remark from './message/Remark';
import Like from './message/Like';


export default class App extends Component {
    render() {
        return (
            <Router forceRefresh={true}>
                <div>
                    <Route exact path='/' component={Advertise} />
                    <Route path='/login' component={Login} />
                    <Route path="/xiaoxitab/:id" component={XiaoxiTab} />
                    <Route path="/shequtab/:id" component={ShequTab} />
                    <Route path="/zhenglitab/:id" component={ZhengliTab} />
                    <Route path="/gerentab/:id" component={GerenTab} />
                    <Route path='/apptab/:id' component={AppTab} />
                    <Route path='/pretty/:id' component={Pretty} />
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                    <Route path="/shequarticle/:id" component={ShequArticle} />
                    <Route path="/office/:id" component={Office} />
                    <Route path="/officearticle/:id" component={OfficeArticle} />
                    <Route path="/review/:id" component={Review} />
                    <Route path="/setup/:id" component={Setup} />
                    <Route path="/aboutme/:id" component={AboutMe} />
                    <Route path="/aboutus/:id" component={AboutUs} />
                    <Route path='/insert/:id' component={Insert} />
                    <Route path='/add/:id' component={Add} />
                    <Route path='/home/:id' component={Home} />
                    <Route path='/robe/:id' component={Robe} />
                    <Route path='/trunk/:id' component={Trunk} />
                    <Route path='/customize/:id' component={Customize} />
                    <Route path='/diaryadd/:id' component={DiaryAdd} />
                    <Route path='/diarysearch/:id/:date' component={DiarySearch} />
                    <Route path='/diary/:id' component={Diary} />
                    <Route path='/articleadd/:id' component={ArticleAdd} />
                    <Route path='/myarticle/:id' component={MyArticle} />
                    <Route path='/myclothing/:id' component={MyClothing} />
                    <Route path='/mycare/:id' component={MyCare} />
                    <Route path='/myfan/:id' component={MyFan} />
                    <Route path='/mycollect/:id' component={MyCollect} />
                    <Route path='/name/:id' component={Name} />
                    <Route path='/city/:id' component={City} />
                    <Route path='/info/:id' component={Info} />
                    <Route path='/sex/:id' component={Sex} />
                    <Route path='/chat/:id' component={Chat} />
                    <Route path="/remark/:id" component={Remark} />
                    <Route path="/like/:id" component={Like} />
                </div> 
            </Router>
        )
    }
}
