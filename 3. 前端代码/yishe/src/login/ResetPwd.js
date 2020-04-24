import React, {Component} from "react";
import fanhui from '../images/fanhui_1.png'
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import './login.css';

export default class ResetPwd extends Component{
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
                    <Link to="/forget"><img src={fanhui} style={{width:'25%'}} key="fan"/></Link>
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
                    <Link to="/login"><Button style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}}>重新登录</Button></Link>
                </Flex>
            </form>  
        </Flex>
    </div>
    }
}