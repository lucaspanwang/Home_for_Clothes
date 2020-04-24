import React, {Component} from "react";
import fanhui from '../images/fanhui_1.png'
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import './login.css';

export default class Forget extends Component{
    constructor(){
        super();
    }    
    // componentDidMount(){
    //     // console.log(this.props.match.params.id);//获取用户id
    // }
    render(){
        return <div style={{width:'100%', height:'100%', position:'relative', backgroundColor:'white'}}>
        <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to="/login"><img src={fanhui} style={{width:'25%'}} key="fan"/></Link>
                ]}
                >忘记密码
        </NavBar>
        <Flex direction="column" justify="center" align="center" style={{paddingTop:'8%'}}>
            <form style={{width:'80%'}}>
                <ul style={{paddingLeft:'0'}}>
                    <li style={{marginBottom:'8%', borderBottom:'solid 1px grey', lineHeight:'100%', fontSize:'18px'}}><p style={{float:'left', lineHeight:'8px'}}>手机号码</p>
                    <InputItem type="phone" placeholder="请输入您的手机号码" style={{width:'95%',display:'inline-block', float:'right'}}/></li>
                    <li style={{position:'relative', marginBottom:'8%', borderBottom:'solid 1px grey', lineHeight:'50px', fontSize:'18px'}}><p style={{float:'left', lineHeight:'8px'}}>验证码&nbsp;&nbsp;&nbsp;</p>
                    <InputItem type="number" maxLength="6" placeholder="请输入验证码" style={{width:'95%',display:'inline-block', float:'right'}}/>
                    <Button style={{position:'absolute', right:'0', top:'-10%',  backgroundColor:'#fc9d9a', width:'30%', color:'white', fontSize:'15px'}}>获取验证码</Button></li>
                </ul>
                <Flex direction="column" justify="center" align="center">
                    <p style={{marginTop:'3%', fontSize:'16px'}}>收不到验证码短信？试试<a style={{color:'#fc9d9a'}}>语音验证码</a></p>
                    <Link to="/resetpwd"><Button style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}}>下一步</Button></Link>
                </Flex>
            </form>  
        </Flex>
    </div>
    }
}