import React, {Component} from "react";
import {InputItem, Button, Icon, } from 'antd-mobile';
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from'react-router-dom';
import logo from '../images/logo_light.png';
import user from '../images/user.png';
import lock from '../images/lock.png';
import wechat from '../images/wechat.png';
import qq from '../images/qq.png';
import weibo from '../images/weibo.png';
import AppTab from "../AppTab";
import Forget from "./Forget";
import Register from "./Register";
import { strict } from "assert";

export default class Login extends Component{
    constructor(){
        super();
    }
    
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    render(){
        return(
        <div className="login">
            <img src={logo} className="login_logo"/>
            <form id="login_form">
                <ul>
                    <li className="login_li">
                        <img src={user} />
                        <div style={{opacity:'0.7'}}>
                        <InputItem className="login_input" type="text" name="用户名" placeholder="请输入您的账号"/></div>
                    </li>
                    <li className="login_li">
                        <img src={lock} />
                        <div style={{opacity:'0.7'}}>
                        <InputItem className="login_input" type="password" name="密码" placeholder="请输入您的密码" maxLength='16'/></div>
                    </li>
                </ul>
            </form>
            
            <form id="login_form2">
                <Button onClick={()=>{this.hrefChange('/apptab')}} style={{color:'white', fontSize:'20px', lineHeight:'55px', fontWeight:'bold', height:'60px', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                <a onClick={()=>{this.hrefChange('/register')}} style={{fontSize:'18px', position:'absolute', color:'white', marginTop:'20px', left:'8px', textShadow:'1px 1px 3px black'}}>注册</a>
                <a onClick={()=>{this.hrefChange('/forget')}} style={{fontSize:'18px', position:'absolute', color:'white', marginTop:'20px', right:'8px', textShadow:'1px 1px 3px black'}}>忘记密码？</a>
                <div className="third_login">
                    <p style={{position:'absolute', right:'0px', color:'rgb(187,187,187)', fontWeight:'bold'}}>——————</p>
                    <p style={{position:'absolute', left:'0px',  color:'rgb(187,187,187)', fontWeight:'bold'}}>——————</p>
                    <p style={{textAlign:'center', fontSize:'18px', left:'0px',  color:'white', textShadow:'1px 1px 3px black'}}>第三方登录</p>
                    <ul id="login_logo">
                        <li><img src={wechat} width="40px"/></li>
                        <li><img src={qq} width="40px"/></li>
                        <li><img src={weibo} width="40px"/></li>
                    </ul>
                </div>
            </form>
        </div>);
    }
}