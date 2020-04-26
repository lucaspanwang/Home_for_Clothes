import React, {Component} from "react";
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
        return <div style={{width:'100%', height:'100%', position:'relative', backgroundColor:'white'}}>
        <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                >消息
        </NavBar>
        <Flex direction="column" justify="center" align="center" style={{paddingTop:'6%'}}>
            <form style={{paddingLeft:'3%', width:'100%'}}>
                <ul style={{paddingLeft:'0', color:'black'}}>
                    <Link to={"/remark/"+this.props.id}><li style={{position:'relative', marginBottom:'2%', lineHeight:'30px', fontSize:'18px', color:'black'}}>
                        <img src={remark} width="16%" style={{borderRadius:'100%', marginLeft:'0%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%'}}>
                            评论
                            <p style={{color:'#a8a8a8', float:'right', marginRight:'3%', fontSize:'22px'}}>></p>
                        </div>
                    </li></Link>
                    <Link to={"/like/"+this.props.id}><li style={{position:'relative', marginBottom:'4%', lineHeight:'30px', fontSize:'18px', color:'black'}}>
                        <img src={thumb} width="16%" style={{borderRadius:'100%', marginLeft:'0%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%'}}>
                            赞
                            <p style={{color:'#a8a8a8', float:'right', marginRight:'3%', fontSize:'22px'}}>></p>
                        </div>
                    </li></Link>
                    <Link to={"/chat?name="+this.props.id+"&room=test"}><li style={{position:'relative', marginBottom:'0%', lineHeight:'30px', fontSize:'18px', color:'black'}}>
                        <img src={user123} width="16%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%', paddingBottom:'4%'}}>
                            123
                            <p style={{fontSize:'15px', color:'#a8a8a8', float:'right', marginTop:'0', marginRight:'2%'}}>4-19</p>
                            <p style={{color:'#666666', margin:'0', fontSize:'16px'}}>嗯嗯，好滴~</p>
                        </div>
                    </li></Link>
                    <li style={{position:'relative', marginBottom:'0%', lineHeight:'30px', fontSize:'18px'}}>
                        <img src={user122} width="16%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%', paddingBottom:'4%'}}>
                            小萌新
                            <p style={{fontSize:'15px', color:'#a8a8a8', float:'right', marginTop:'0', marginRight:'2%'}}>4-19</p>
                            <p style={{color:'#666666', margin:'0', fontSize:'16px'}}>OK，拜拜啦</p>
                        </div>
                    </li>
                </ul>
                {/* <Flex direction="column" justify="center" align="center">
                    <Link to="/login"><Button style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}}>重新登录</Button></Link>
                </Flex> */}
            </form>  
        </Flex>
    </div>
    }
}