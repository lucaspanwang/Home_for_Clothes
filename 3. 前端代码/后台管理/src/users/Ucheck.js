import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography,Layout } from 'antd';

import {standardTime} from '../common/standardTime';
import zhanghao from '../images/zhanghao.png';
import chengshi from '../images/chengshi.png';
import shouji from '../images/shouji.png';
import jianjie from '../images/jianjie.png';
import fatie from '../images/fatie.png';
import yifu from '../images/yifu.png';
import guanzhu from '../images/guanzhu.png';
import fensi from '../images/fensi.png';
import male from '../images/male.png';
import female from '../images/female.png';

const { Paragraph } = Typography;
const { Sider, Content } = Layout;

export default class Ucheck extends Component {
    constructor(){
        super();
        this.state={
            user:{},
            detail:[],
            article:[]
        }
    }
    componentDidMount(){
        fetch("http://47.98.163.228:3004/users?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                res[i].time = standardTime(res[i].time)
            }
            this.setState({
                user:res[0]
            },function(){
                console.log(this.state.user);
            })
        });
        fetch("http://47.98.163.228:3004/detail?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                detail:res
            },function(){
                console.log(this.state.detail);
            })
        });
        fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                res[i].time = standardTime(res[i].time)
            }
            this.setState({
                article:res
            },function(){
                console.log(this.state.article);
            })
        });
    }
    render() {
        return (
            <div className="middle">
                <div style={{height:'30px',marginBottom:'15px',borderBottom:'1px dashed #ddd'}}>
                    <Link to='/tab/users' style={{color:'#1890ff',fontSize:'20px'}}>用户信息管理</Link>
                </div>
                <Layout>
                    <Content style={{background:'#fff',borderRight:'1px dashed #ddd'}}>
                        <div style={{borderBottom:'1px solid #ddd',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                            <div>
                                <img src={this.state.user.userPic} alt="头像" style={{width:'50px',heihgt:'50px',borderRadius:'50%',margin:'0 10px'}} />
                                <span style={{fontSize:'20px'}}>{this.state.user.userName}</span>
                            </div>
                        </div>
                        <ul style={{padding:'10px 25px',borderBottom:'8px solid #eee'}}>
                            <li style={{width:'100%',padding:'10px'}}>
                                <img src={zhanghao} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                账号：{this.state.user.userId}
                            </li>
                            <li style={{width:'100%',padding:'10px'}}>
                                <img src={chengshi} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                城市：{this.state.user.userProvince}/{this.state.user.userCity}
                            </li>
                            <li style={{width:'100%',padding:'10px'}}>
                                <img src={shouji} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                手机：{this.state.user.userPho}
                            </li>
                            <li style={{width:'100%',padding:'10px'}}>
                                <img src={jianjie} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                简介：{this.state.user.userIntro}
                            </li>
                        </ul>
                        {
                            this.state.article.length
                            ?(<ul style={{width:'100%'}}>
                                <span style={{color:'rgba(120,150,255)',padding:'20px 15px',fontSize:'16px',fontFamily:'youyuan'}}>该用户的发帖</span>
                                {
                                    this.state.article.map((item,index)=>(
                                        <li key={index} style={{padding:"10px 15px",display:'flex',flexDirection:'row',alignItems:'center'}}>
                                            <img src={item.userPic} style={{width:'40px',height:'40px',marginRight:'15px',borderRadius:'8px'}} />
                                            <Paragraph ellipsis={{rows:1}} style={{width:'calc(90% - 55px)'}} >
                                                <Link to={'/tab/acheck/'+item.articleId} style={{color:'#444'}}>{item.content}</Link>
                                            </Paragraph>
                                            <span style={{width:'10%',textAlign:'right',color:'#888'}}>{item.time}</span>
                                        </li>
                                    ))
                                }
                            </ul>)
                            :(<span>该用户还没有发帖</span>)
                        }
                    </Content>
                    <Sider theme="light" style={{padding:'15px'}}>
                        <span style={{fontSize:'16px',fontFamily:'youyuan'}}>个人信息</span>
                        <div style={{width:'100%',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <img src={this.state.user.userPic} alt="个人头像" style={{width:'50px',heihgt:'50px',borderRadius:'50%',margin:'10px 0'}} />
                            <span style={{color:'#444'}}>
                                {this.state.user.userName}
                                <img src={this.state.user.userSex=='男'?male:female} style={{width:'18px'}}/>
                            </span>
                        </div>
                        <ul>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={fatie} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                发帖：{this.state.detail[0]}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={yifu} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                衣服：{this.state.detail[1]}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={guanzhu} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                关注：{this.state.detail[2]}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={fensi} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                粉丝：{this.state.detail[3]}
                            </li>
                        </ul>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
