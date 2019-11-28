import React, {Component} from "react";
import fanhui from '../images/返回 (1).png'
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';

export default class ResetPwd extends Component{
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
                    <a onClick={()=>{this.hrefChange('forget')}}><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
                ]}
                >重置密码
        </NavBar>
        <Flex direction="column" justify="center" align="center" style={{paddingTop:'8%'}}>
            <form style={{width:'80%'}}>
                <ul style={{paddingLeft:'0'}}>
                    <li style={{marginBottom:'7%', borderBottom:'solid 1px grey', lineHeight:'50px', fontSize:'18px'}}><p style={{float:'left', lineHeight:'8px'}}>新密码&nbsp;&nbsp;&nbsp;</p>
                    <InputItem type="password" visable='true' placeholder="请输入密码" style={{width:'95%',display:'inline-block', float:'right'}}/></li>
                    <li style={{position:'relative', marginBottom:'7%', borderBottom:'solid 1px grey', lineHeight:'50px', fontSize:'18px'}}><p style={{float:'left', lineHeight:'8px'}}>验证密码</p>
                    <InputItem type="password" placeholder="请确认密码" style={{width:'95%',display:'inline-block', float:'right'}}/>
                    </li>
                </ul>
                <Flex direction="column" justify="center" align="center">
                    <Button onClick={()=>{this.hrefChange('login')}} style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}}>重新登录</Button>
                </Flex>
            </form>  
        </Flex>
    </div>
    }
}