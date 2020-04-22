import React, {Component} from "react";
import fanhui from '../images/返回 (1).png';
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import remark from '../images/message/remark.png';
import thumb from '../images/message/thumb.png';
import user123 from '../images/message/123.jpg';
import user122 from '../images/message/122.jpg';


// import './login.css';

export default class ResetPwd extends Component{
    constructor(){
        super();
    }    

    render(){
        return <div style={{width:'100%', height:'100%', position:'relative', backgroundColor:'#dddddd'}}>
        <NavBar 
            style={{backgroundColor:'#fc9d9a',color:'white'}}
            leftContent={[
                <Link to="/message"><img src={fanhui} style={{width:'25%'}} key="fan"/></Link>
            ]}
            >评论
                </NavBar>
        <div style={{margin:'0', padding:'0', backgroundColor:'#eeeeee'}}>
            <form style={{width:'100%', padding:'0'}}>
                <ul style={{margin:'0', paddingLeft:'0', color:'black'}}>
                    <li style={{marginBottom:'5%', lineHeight:'30px', fontSize:'15px', backgroundColor:'white', paddingTop:'3%', paddingBottom:'4%'}}>
                        <div style={{paddingLeft:'4%'}}>
                            <img src={user123} width="14%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                            <div style={{width:'80%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                <p style={{margin:'0', lineHeight:'15px'}}>张三</p>
                                <p style={{color:'#666666', margin:'0', fontSize:'13px'}}>昨天 14:23</p>
                            </div>
                        </div>
                        <div style={{margin:'0', padding:'0', marginRight:'3%'}}>
                            <p style={{paddingLeft:'4%', marginTop:'-2%', lineHeight:'15px'}}>你的这个衣服好漂亮呀!我喜欢！</p>
                            <div style={{backgroundColor:'#eeeeee', fontSize:'15px', marginTop:'4%'}}>
                                <img src={user122} width="30%" style={{}}/>
                                <div style={{width:'50%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                    <p style={{margin:'0', lineHeight:'16px'}}>@ 小小卢卡斯</p>
                                    <p style={{color:'#666666', margin:'0', fontSize:'14px'}}>分享图片</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li style={{marginBottom:'5%', lineHeight:'30px', fontSize:'15px', backgroundColor:'white', paddingTop:'3%', paddingBottom:'4%'}}>
                        <div style={{paddingLeft:'4%'}}>
                            <img src={user123} width="14%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                            <div style={{width:'80%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                <p style={{margin:'0', lineHeight:'15px'}}>张三</p>
                                <p style={{color:'#666666', margin:'0', fontSize:'13px'}}>昨天 14:23</p>
                            </div>
                        </div>
                        <div style={{margin:'0', padding:'0', marginRight:'3%'}}>
                            <p style={{paddingLeft:'4%', marginTop:'-2%', lineHeight:'15px'}}>你的这个衣服好漂亮呀!我喜欢！</p>
                            <div style={{backgroundColor:'#eeeeee', fontSize:'15px', marginTop:'4%'}}>
                                <img src={user122} width="30%" style={{}}/>
                                <div style={{width:'50%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                    <p style={{margin:'0', lineHeight:'16px'}}>@ 小小卢卡斯</p>
                                    <p style={{color:'#666666', margin:'0', fontSize:'14px'}}>分享图片</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li style={{marginBottom:'5%', lineHeight:'30px', fontSize:'15px', backgroundColor:'white', paddingTop:'3%', paddingBottom:'4%'}}>
                        <div style={{paddingLeft:'4%'}}>
                            <img src={user123} width="14%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                            <div style={{width:'80%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                <p style={{margin:'0', lineHeight:'15px'}}>张三</p>
                                <p style={{color:'#666666', margin:'0', fontSize:'13px'}}>昨天 14:23</p>
                            </div>
                        </div>
                        <div style={{margin:'0', padding:'0', marginRight:'3%'}}>
                            <p style={{paddingLeft:'4%', marginTop:'-2%', lineHeight:'15px'}}>你的这个衣服好漂亮呀!我喜欢！</p>
                            <div style={{backgroundColor:'#eeeeee', fontSize:'15px', marginTop:'4%'}}>
                                <img src={user122} width="30%" style={{}}/>
                                <div style={{width:'50%', marginLeft:'4%', display:'inline-block', fontSize:'15px', paddingLeft:'2%', paddingBottom:'4%'}}>
                                    <p style={{margin:'0', lineHeight:'16px'}}>@ 小小卢卡斯</p>
                                    <p style={{color:'#666666', margin:'0', fontSize:'14px'}}>分享图片</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>  
        </div>
    </div>
    }
}