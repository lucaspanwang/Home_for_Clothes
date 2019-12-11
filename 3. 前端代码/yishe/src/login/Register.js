import React, {Component} from "react";
import fanhui from '../images/返回 (1).png';
import { NavBar, WingBlank, Flex, InputItem, Button} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import camera from '../images/camera.png';
import phone from '../images/phone.png';
import doc from '../images/doc.png';
import lock from '../images/lock_grey.png';
import './login.css';

export default class Register extends Component{
    constructor(){
        super();
        this.state = {
            url:'http://47.98.163.228:8082/register',
            userPho:'',
            userPwd:'',
        }
        this.postData = this.postData.bind(this);
    }

    postData(){
        fetch("http://47.98.163.228:8082/register", {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({userPho:this.state.userPho, userPwd:this.state.userPwd})
      })
    }
    
    // hrefChange(str){
    //     var h=window.location.href;
    //     var index = h.lastIndexOf("\/");  
    //     window.location.href = h.substring(0, index+1)+str;
    // }

    render(){
        return <div style={{width:'100%',height:'100%', position:'relative', backgroundColor:'white'}}>
        <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    // <a onClick={()=>{this.hrefChange('login')}}><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
                    <Link to="/login"><img src={fanhui} style={{width:'25%'}} key="fan"/></Link>
                ]}
                >注册
        </NavBar>
        <Flex direction="column" justify="center" align="center" style={{paddingTop:'5%'}}>
            <div id="camera_div">
                <img src={camera} width="50%" style={{position:'absolute', left:'24%', top:'15%'}}/>
                <p style={{position:'absolute', top:'62%', left:'21%', color:'#a8a8a8'}}>添加头像</p>
            </div>
            <div id='register_info'>
                <form>
                <ul id='register_input'>
                    <li><img src={phone} width="14%"/><InputItem className='register_input' placeholder='手机号码' type='phone' onChange={(e)=>this.setState({userPho:e})}/></li>
                    {/* <li style={{position:'relative'}}><img src={doc} width="14%"/><InputItem className='register_input' placeholder='验证码' type='number' maxLength='6'/><Button style={{position:'absolute', right:'0', top:'0',  backgroundColor:'#fc9d9a', width:'35%', color:'white'}}>发送验证码</Button></li> */}
                    <li><img src={lock} width="14%"/><InputItem className='register_input' placeholder='密码(6-16位数字字母组合)' type='password' maxLength='16' onChange={(e)=>this.setState({userPwd:e})}/></li>
                </ul>
                    <Flex direction="column" justify="center" align="center">
                        <Button onClick={this.postData} style={{textAlign:'center', backgroundColor:'#fc9d9a', color:'white', width:'80%', marginTop:'5%'}}>立 即 注 册</Button>
                        <p style={{marginTop:'8%', }}>注册代表您同意<a style={{color:'#fc9d9a'}}>《用户协议》</a></p>
                    </Flex>
                </form>
            </div>
        </Flex>
    </div>
    }
}