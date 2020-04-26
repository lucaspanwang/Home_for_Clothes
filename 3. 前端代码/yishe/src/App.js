import React, { Component} from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
//登录部分
import Advertise from './login/Advertise';
import Login from './login/Login';
import Forget from './login/Forget';
import Register from './login/Register';
import ResetPwd from './login/ResetPwd';
//tab键部分
import AppTab from './AppTab';
//穿搭部分
import Pretty from './wear/Pretty'
//整理箱部分
import Insert from './store/Insert';
import Add from './store/Add';
import Home from './store/Home';
import Robe from './store/Robe';
import Trunk from './store/Trunk';
import Customize from './store/Customize'
//社区部分
import Office from './community/Office';
import OfficeArticle from './community/OfficeArticle';
import Search from './community/Search';
import ArticleAdd from './community/ArticleAdd';
import ShequArticle from './community/Article';
import Review from './community/Review';
//消息部分
import Chat from './message/Chat/Chat';
import Remark from './message/Remark';
import Like from './message/Like';
//个人部分
import Setup from './me/Setup';
import AboutUs from './me/AboutUs';
import MyArticle from './me/MyArticle';
import MyClothing from './me/MyClothing';
import MyCare from './me/MyCare';
import MyFan from './me/MyFan';
import MyCollect from './me/MyCollect';
import Myfankui from './me/Myfankui';
//个人设置部分
import AboutMe from './me/AboutMe';
import Name from './me/Name.js';
import City from './me/City.js';
import Info from './me/Info.js';
import Sex from './me/Sex';
//日记部分
import DiaryAdd from './me/diary/DiaryAdd';
import DiarySearch from './me/diary/DiarySearch';
import Diary from './me/diary/Diary';

export default class App extends Component {
    render() {
        return (
            <Router forceRefresh={true}>
                <div>
                    <Route exact path='/' component={Advertise} />
                    {/* 登录部分 */}
                    <Route path='/login' component={Login} />
                    <Route path='/forget' component={Forget} />
                    <Route path='/register' component={Register} />
                    <Route path='/resetpwd' component={ResetPwd} />
                    {/* tab键部分 */}
                    <Route path='/apptab/:id' component={AppTab} />
                    {/* 穿搭部分 */}
                    <Route path='/pretty/:id' component={Pretty} />
                    {/* 整理箱部分 */}
                    <Route path='/insert/:id' component={Insert} />
                    <Route path='/add/:id' component={Add} />
                    <Route path='/home/:id' component={Home} />
                    <Route path='/robe/:id' component={Robe} />
                    <Route path='/trunk/:id' component={Trunk} />
                    <Route path='/customize/:id' component={Customize} />
                    {/* 社区部分 */}
                    <Route path="/shequarticle/:id" component={ShequArticle} />
                    <Route path="/search/:id" component={Search} />
                    <Route path="/office/:id" component={Office} />
                    <Route path="/officearticle/:id" component={OfficeArticle} />
                    <Route path="/review/:id" component={Review} />
                    <Route path='/articleadd/:id' component={ArticleAdd} />
                    {/* 消息部分 */}
                    <Route path='/chat' component={Chat} />
                    <Route path="/remark/:id" component={Remark} />
                    <Route path="/like/:id" component={Like} />
                    {/* 个人部分 */}
                    <Route path="/setup/:id" component={Setup} />
                    <Route path="/aboutus/:id" component={AboutUs} />
                    <Route path='/myarticle/:id' component={MyArticle} />
                    <Route path='/myclothing/:id' component={MyClothing} />
                    <Route path='/mycare/:id' component={MyCare} />
                    <Route path='/myfan/:id' component={MyFan} />
                    <Route path='/myfankui/:id' component={Myfankui} />
                    <Route path='/mycollect/:id' component={MyCollect} />
                    {/* 个人设置部分 */}
                    <Route path="/aboutme/:id" component={AboutMe} />
                    <Route path='/name/:id' component={Name} />
                    <Route path='/city/:id' component={City} />
                    <Route path='/info/:id' component={Info} />
                    <Route path='/sex/:id' component={Sex} />
                    {/* 日记部分 */}
                    <Route path='/diaryadd/:id' component={DiaryAdd} />
                    <Route path='/diarysearch/:id/:date' component={DiarySearch} />
                    <Route path='/diary/:id' component={Diary} />
                </div> 
            </Router>
        )
    }
}
