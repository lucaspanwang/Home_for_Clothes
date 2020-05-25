import React, {Component} from "react";
import {NavBar, Flex, InputItem, Button} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import remark from '../images/message/remark.png';
import thumb from '../images/message/thumb.png';
import user123 from '../images/message/123.jpg';
import user122 from '../images/message/122.jpg';
import group1 from '../images/group1.jpg';

// import './login.css';

export default class ResetPwd extends Component{
    constructor(){
        super();
        this.state = {
            user:{},
          }
    }
    
    componentDidMount(){
        fetch("http://47.98.163.228:3004/users?userId="+123)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
            }
            this.setState({
                user:res[0]
            })
        });
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
                    <Link to={"/chat?name="+this.props.id+"&room=111?123"}><li style={{position:'relative', marginBottom:'0%', lineHeight:'30px', fontSize:'18px'}}>
                        <img src={this.state.user.userPic} width="16%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%', paddingBottom:'4%', color:'black'}}>
                            {this.state.user.userName}
                            <p style={{fontSize:'15px', color:'#a8a8a8', float:'right', marginTop:'0', marginRight:'2%'}}>5-26</p>
                            <p style={{color:'#666666', margin:'0', fontSize:'16px'}}>OK，拜拜啦</p>
                        </div>
                    </li></Link>
                    <Link to={"/chat?name="+this.props.id+"&room=group0"}><li style={{position:'relative', marginBottom:'0%', lineHeight:'30px', fontSize:'18px', color:'black'}}>
                        <img src={group1} width="16%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
                        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%', paddingBottom:'4%', color:'black'}}>
                            衣舍内测用户体验群1群
                            <p style={{fontSize:'15px', color:'#a8a8a8', float:'right', marginTop:'0', marginRight:'2%'}}>5-24</p>
                            <p style={{color:'#666666', margin:'0', fontSize:'16px'}}>嗯嗯，好滴~</p>
                        </div>
                    </li></Link>
                </ul>
                {/* <Flex direction="column" justify="center" align="center">
                    <Link to="/login"><Button style={{marginTop:'7%' ,backgroundColor:'#fc9d9a', width:'90%', color:'white', fontSize:'15px'}}>重新登录</Button></Link>
                </Flex> */}
            </form>  
        </Flex>
    </div>
    }
}