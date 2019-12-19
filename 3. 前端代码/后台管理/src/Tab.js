import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Body from './Body'
export default class Tab extends Component {
    render() {
        return (
            <div id="wrapper">
            <nav class="navbar navbar-default top-navbar" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span class="sr-only">衣舍</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html"><i class="fa fa-gear"></i> <strong>衣舍</strong></a>
                </div>
                <ul class="nav navbar-top-links navbar-right">

                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i class="fa fa-bell fa-fw"></i> <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-alerts">
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-comment fa-fw"></i> New Comment
                                        <span class="pull-right text-muted small">4 min</span>
                                    </div>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#">
                                    <div>
                                        <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span class="pull-right text-muted small">12 min</span>
                                    </div>
                                </a>
                            </li>
                        </ul>

                    </li>
 
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li class="divider"></li>
                            <li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <nav class="navbar-default navbar-side" role="navigation">
            <div id="sideNav" href=""><i class="fa fa-caret-right"></i></div>
                <div class="sidebar-collapse">
                    <ul class="nav" id="main-menu">
                        <li>
                            <Link to='/index'>
                            <i class="fa fa-dashboard"></i> 首页
                            </Link>
                        </li>
                        <li>
                            <Link to='/table1'>
                                <i class="fa fa-desktop"></i>
                                管理员系统
                            </Link>
                        </li>
                        <li>
                            <Link to='/table2'>
                                <i class="fa fa-bar-chart-o"></i> 用户管理  
                            </Link>
                        </li>
                        <li>
                            <Link to='/muxing'>
                            <i class="fa fa-qrcode"></i>模型管理
                            </Link>
                        </li>
                        <li>
                            <Link to='/table3'>
                                <i class="fa fa-table"></i>文章管理
                            </Link>
                        </li>
                        <li>
                            <Link to='/table4'>
                                <i class="fa fa-table"></i>官方消息
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        )
    }
}
