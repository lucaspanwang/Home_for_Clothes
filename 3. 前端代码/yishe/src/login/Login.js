import React, {Component} from "react";
import {InputItem, Button, Icon, } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import logo from '../images/logo_light.png';
import user from '../images/user.png';
import lock from '../images/lock.png';
import wechat from '../images/wechat.png';
import qq from '../images/qq.png';
import weibo from '../images/weibo.png';
import login_bg from '../images/login_bg.jpg';
import styles from"./login.css";

export default class Login extends Component{
    constructor(){
        super();
    }
    
    // hrefChange(str){
    //     var h=window.location.href;
    //     var index = h.lastIndexOf("\/");  
    //     window.location.href = h.substring(0, index+1)+str;
    // }

    render(){
        return(
        <div className="login" className={styles.enter}>
            <img src={login_bg} width='100%' height='100%'/>
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
                {/* <Button onClick={()=>{this.hrefChange('apptab')}} style={{color:'white', fontSize:'110%', lineHeight:'300%', fontWeight:'bold', height:'100%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button> */}
                <Link to="/apptab"><Button style={{color:'white', fontSize:'110%', lineHeight:'300%', fontWeight:'bold', height:'100%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button></Link>
                <Link to="/register" style={{fontSize:'110%', position:'absolute', color:'white', marginTop:'6%', left:'3%', textShadow:'1px 1px 3px black'}}>注册</Link>
                <Link to="/forget" style={{fontSize:'110%', position:'absolute', color:'white', marginTop:'6%', right:'3%', textShadow:'1px 1px 3px black'}}>忘记密码？</Link>
                <div className="third_login">
                    <p style={{position:'absolute', right:'0', color:'rgb(187,187,187)', fontWeight:'bold'}}>——————</p>
                    <p style={{position:'absolute', left:'0',  color:'rgb(187,187,187)', fontWeight:'bold'}}>——————</p>
                    <p style={{textAlign:'center', fontSize:'18px', left:'0px',  color:'white', textShadow:'1px 1px 3px black'}}>第三方登录</p>
                    <ul id="login_logo">
                        <li><img src={wechat}/></li>
                        <li><img src={qq}/></li>
                        <li><img src={weibo} /></li>
                    </ul>
                </div>
            </form>
        </div>);
    }
}