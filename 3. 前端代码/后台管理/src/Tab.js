import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './tab.css';
import logo from './images/logo_bai.png'
import Table1 from './Table1';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Tab extends Component {
    constructor(){
        super();
        this.state={
            collapsed: false,
        }
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Layout style={{minHeight:'5vh',padding:'0 25px',background:"#001529"}}>
                    <Content style={{display:'flex',alignItems:'center'}}>
                        <span className="yishe-title">衣舍管理系统</span>
                    </Content>
                    <Sider style={{margin:'auto 10px'}}>
                        <i className="iconfont header-icon icon-yonghu-copy"></i>
                        <i className="iconfont header-icon icon-tixing"></i>
                        <i className="header-icon" style={{marginRight:15}}>你好，admin</i>
                    </Sider>
                </Layout>
                <Layout className="site-layout">
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo">
                            <img src={logo} alt="logo" style={{width:'60%',margin:'10px 20%'}}/> 
                        </div> 
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1"><i className="iconfont icon-yemian-copy-copy-copy"></i>首页</Menu.Item>
                            <Menu.Item key="2"><i className="iconfont icon-guanliyuan"></i>管理员信息</Menu.Item>
                            <Menu.Item key="3"><i className="iconfont icon-moxing"></i>人物模型管理</Menu.Item>
                            <Menu.Item key="4"><i className="iconfont icon-yonghu"></i>用户信息管理</Menu.Item>
                            <Menu.Item key="5"><i className="iconfont icon-wenzhang"></i>社区文章管理</Menu.Item>
                            <Menu.Item key="6"><i className="iconfont icon-guanfangxiaoxi"></i>官方消息管理</Menu.Item>
                            <Menu.Item key="7"><i className="iconfont icon-fankui"></i>反馈信息管理</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{ margin: '15px' }}>
                            <div className="site-layout-background" style={{padding:'10px 15px', minHeight:480,background:'#fff'}}>
                            <Table1/>
                            </div>
                        </Content>
                        <Footer style={{textAlign:'center'}}>yishe-houtai ©2020 Created by YiShe</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
// import Body from './Body'
// export default class Tab extends Component {
//     render() {
//         return (
//             <div id="wrapper">
//             <nav class="navbar navbar-default top-navbar" role="navigation">
//                 <div class="navbar-header">
//                     <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
//                         <span class="sr-only">衣舍</span>
//                         <span class="icon-bar"></span>
//                         <span class="icon-bar"></span>
//                         <span class="icon-bar"></span>
//                     </button>
//                     <a class="navbar-brand" href="index.html"><i class="fa fa-gear"></i> <strong>衣舍</strong></a>
//                 </div>
//                 <ul class="nav navbar-top-links navbar-right">

//                     <li class="dropdown">
//                         <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
//                             <i class="fa fa-bell fa-fw"></i> <i class="fa fa-caret-down"></i>
//                         </a>
//                         <ul class="dropdown-menu dropdown-alerts">
//                             <li>
//                                 <a href="#">
//                                     <div>
//                                         <i class="fa fa-comment fa-fw"></i> New Comment
//                                         <span class="pull-right text-muted small">4 min</span>
//                                     </div>
//                                 </a>
//                             </li>
//                             <li class="divider"></li>
//                             <li>
//                                 <a href="#">
//                                     <div>
//                                         <i class="fa fa-twitter fa-fw"></i> 3 New Followers
//                                         <span class="pull-right text-muted small">12 min</span>
//                                     </div>
//                                 </a>
//                             </li>
//                         </ul>

//                     </li>
 
//                     <li class="dropdown">
//                         <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
//                             <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
//                         </a>
//                         <ul class="dropdown-menu dropdown-user">
//                             <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
//                             </li>
//                             <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
//                             </li>
//                             <li class="divider"></li>
//                             <li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
//                             </li>
//                         </ul>
//                     </li>
//                 </ul>
//             </nav>
//             <nav class="navbar-default navbar-side" role="navigation">
//             <div id="sideNav" href=""><i class="fa fa-caret-right"></i></div>
//                 <div class="sidebar-collapse">
//                     <ul class="nav" id="main-menu">
//                         <li>
//                             <Link to='/tab/index'>
//                             <i class="fa fa-dashboard"></i> 首页
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/table1'>
//                                 <i class="fa fa-desktop"></i>
//                                 管理员系统
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/table2'>
//                                 <i class="fa fa-bar-chart-o"></i> 用户管理  
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/muxing'>
//                             <i class="fa fa-qrcode"></i>模型管理
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/table3'>
//                                 <i class="fa fa-table"></i>文章管理
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/table4'>
//                                 <i class="fa fa-table"></i>官方消息
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to='/tab/table5'>
//                                 <i class="fa fa-table"></i>用户反馈
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//             </div>
//         )
//     }
// }

