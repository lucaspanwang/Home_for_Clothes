import React, {Component} from "react";
import fanhui from '../images/返回 (1).png'
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';

export default class Forget extends Component{
    constructor(){
        super();
    }
    
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    render(){
        return <div style={{width:'100%', height:'100%', position:'relative', backgroundColor:'white'}}>
        <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <a onClick={()=>{this.hrefChange('login')}}><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
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
                    <Button style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}} onClick={()=>{this.hrefChange('resetpwd')}}>下一步</Button>
                </Flex>
            </form>  
        </Flex>
    </div>
    }
}