import React, {Component} from "react";
import {InputItem, Button, Flex } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import logo from '../images/logo_light.png';
import user from '../images/user.png';
import lock from '../images/lock.png';
import wechat from '../images/wechat.png';
import qq from '../images/qq.png';
import weibo from '../images/weibo.png';
import login_bg from '../images/login_bg.jpg';
import styles from"./login.css";
import {Consumer} from '../context'

export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            url:'http://47.98.163.228:8082/login',
            lUserId:'',
            lUserPwd:'',
            flag:-1,//flag为-1表示等待，为0表示用户名或密码输入错误，为1表示登陆成功
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(){
        if(this.state.flag==0){
            document.getElementById('judgeF').style.display='block';
        }
        if(this.state.flag==-1){
            document.getElementById('judgeF').style.display='none';
        }
        if(this.state.flag==1){
            document.getElementById('judgeT').style.display='block';
            // res.setHeader('Set-cookie', `userId=${this.state.lUserId}; max-age=10000000`);
            localStorage.setItem('userId', this.state.lUserId)
        }
    }

    handleClick(){
        const lUserId = this.state.lUserId;
        var lUserPwd = this.state.lUserPwd;
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            {   
                var i;
                for(i=0;i<res.length;i++){
                    if(lUserId==res[i].userId){
                        if(lUserPwd==res[i].userPwd){
                            this.setState({flag:1});
                        }else{
                            this.setState({flag:0});
                        }
                    }
                    if((i==res.length-1 && lUserId!=res[i].userId)&&this.state.flag!=1){
                        this.setState({flag:0});
                    }
                }
            }
        });
    }
    
    // hrefChange(str){
    //     var h=window.location.href;
    //     var index = h.lastIndexOf("\/");  
    //     window.location.href = h.substring(0, index+1)+str;
    // }
    wangpan=()=>{
        this.setState({flag:-1});
    }
    render(){
        // const displayWait = {
        //     display: this.state.displayW?'block':'none'
        // };
        // const displayFalse = {
        //     display: this.state.displayF?'block':'none'
        // };
        return(
        <Consumer>
            {
                (data)=>{ return <div className="login" className={styles.enter}>
                    <Flex id='judgeT' class="judge" direction="column" justify="center" align="center" style={{display:'none'}}>
                        <p>&nbsp;&nbsp;欢迎光临衣舍！</p>
                        <Link to={"/apptab/"+this.state.lUserId}><Button onClick={this.wangpan} style={{marginTop:'20%', marginLeft:'15%', color:'white', fontSize:'90%', fontWeight:'bold', width:'70%', height:'20%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>G&nbsp;&nbsp;O</Button></Link>
                    </Flex>
                    <Flex id='judgeF' class="judge" direction="column" justify="center" align="center" style={{display:'none'}}>
                        <p>帐号或密码错误！</p>
                        <Button onClick={()=>{this.setState({flag:-1})}} style={{marginTop:'20%', marginLeft:'15%', color:'white', fontSize:'70%', fontWeight:'bold', width:'70%', height:'20%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;试</Button>
                    </Flex>
                    <img src={login_bg} width='100%' height='100%'/>
                    <img src={logo} className="login_logo"/>
                    <form id="login_form">
                        <ul>
                            <li className="login_li">
                                <img src={user} />
                                <div style={{opacity:'0.7'}}>
                                <InputItem className="login_input" type="text" name="用户名" placeholder="请输入您的账号" onChange={(e)=>this.setState({lUserId:e})}/></div>
                            </li>
                            <li className="login_li">
                                <img src={lock} />
                                <div style={{opacity:'0.7'}}>
                                <InputItem className="login_input" type="password" name="密码" placeholder="请输入您的密码" maxLength='16' onChange={(e)=>this.setState({lUserPwd:e})} /></div>
                            </li>
                        </ul>
                    </form>
                    
                    <form id="login_form2">
                        {/* <Button onClick={()=>{this.hrefChange('apptab')}} style={{color:'white', fontSize:'110%', lineHeight:'300%', fontWeight:'bold', height:'100%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button> */}
                        <Button onClick={()=>{this.handleClick(); data.userId = this.state.lUserId; console.log(data.userId)}} style={{color:'white', fontSize:'110%', lineHeight:'300%', fontWeight:'bold', height:'100%', backgroundColor:'rgb(36,217,238)', border:'solid 1px blue'}}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
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
                </div>
                }
            }
        </Consumer>
        );
    }
}