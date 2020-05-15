import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import './tab.css';
import logo from './images/logo_bai.png'

//首页
import Index from './index/Index';
//管理员
import Manager from './manager/Manager';
import Medit from './manager/Medit';
//用户
import Users from './users/Users';
import Ucheck from './users/Ucheck';
//模型
import Model from './model/Model';
//文章管理
import Article from './article/Article';
import AddArticle from './article/Add';
import Aedit from './article/Aedit';
import Acheck from './article/Acheck';
//官方消息
import Official from './official/Official';
import AddOfficial from './official/AddOfficial';
import Oedit from './official/Oedit';
import Ocheck from './official/Ocheck';
//反馈
import Feedback from './feedback/Feedback';
import Huifu from './feedback/Huifu';
import Fankuixiangqing from './feedback/Fankuixiangqing';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Tab extends Component {
    constructor(){
        super();
        this.state={
            collapsed: false,
            id: sessionStorage.getItem('manager'),
            manager: {}
        }
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/manager?id='+this.state.id)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    manager:res[0]
                })
            })
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            // 最后在设置一下必须登陆才能显示这一页
            <Layout style={{minHeight:'100vh'}}>
                <Layout style={{minHeight:'5vh',padding:'0 25px',background:"#001529"}}>
                    <Content style={{display:'flex',alignItems:'center'}}>
                        <span className="yishe-title">衣舍后台管理系统</span>
                    </Content>
                    <Sider style={{margin:'auto 10px'}}>
                        <i className="iconfont header-icon icon-yonghu-copy"></i>
                        <i className="iconfont header-icon icon-tixing"></i>
                        <i className="header-icon" style={{marginRight:15}}>你好，{this.state.manager.ming}</i>
                    </Sider>
                </Layout>
                <Layout className="site-layout">
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo">
                            <img src={logo} alt="logo" style={{width:'60%',margin:'10px 20%'}}/> 
                        </div> 
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to="/tab/index"><i className="iconfont icon-yemian-copy-copy-copy"></i>首页</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/tab/manager"><i className="iconfont icon-guanliyuan"></i>管理员信息</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/tab/users"><i className="iconfont icon-yonghu"></i>用户信息管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/tab/model"><i className="iconfont icon-moxing"></i>人物模型管理</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/tab/official"><i className="iconfont icon-guanfangxiaoxi"></i>官方消息管理</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/tab/article"><i className="iconfont icon-wenzhang"></i>社区文章管理</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/tab/feedback"><i className="iconfont icon-fankui"></i>反馈信息管理</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{height:'90vh',margin:'2vh 2vw',overflowY:'scroll',zIndex:99,background:'rgba(255,255,255,0.4)',borderRadius:'5px'}}>
                        <Content>
                            <div className="site-layout-background" style={{padding:'10px 15px', minHeight:480}}>
                                {/* 首页 */}
                                <Route exact path='/tab' component={Index} />
                                <Route path='/tab/index' component={Index} />
                                {/* 管理员 */}
                                <Route path='/tab/manager' component={Manager} />
                                <Route path='/tab/medit/:id' component={Medit} />
                                {/* 用户 */}
                                <Route path='/tab/users' component={Users} />
                                <Route path='/tab/ucheck/:id' component={Ucheck} />
                                {/* 模型 */}
                                <Route path='/tab/model' component={Model} />
                                {/* 文章 */}
                                <Route path='/tab/article' component={Article} />
                                <Route path='/tab/addarticle' component={AddArticle} />
                                <Route path='/tab/aedit/:id' component={Aedit} />
                                <Route path='/tab/acheck/:id' component={Acheck} />
                                {/* 官方消息 */}
                                <Route path='/tab/official' component={Official} />
                                <Route path='/tab/addofficial' component={AddOfficial} />
                                <Route path='/tab/oedit/:id' component={Oedit} />
                                <Route path='/tab/ocheck/:id' component={Ocheck} />
                                {/* 反馈 */}
                                <Route path='/tab/feedback' component={Feedback} />
                                <Route path='/tab/huifu/:id' component={Huifu} />
                                <Route path='/tab/fankuixiangqing/:id' component={Fankuixiangqing} />
                            </div>
                        </Content>
                        {/* <Footer style={{textAlign:'center',background:'rgba(0,0,0,0)'}}>yishe-houtai ©2020 Created by YiShe</Footer> */}
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}