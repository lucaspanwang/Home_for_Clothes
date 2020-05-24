import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import {standardTime} from '../common/standardTime';
import zhanghao from '../images/zhanghao.png';
import chengshi from '../images/chengshi.png';
import shouji from '../images/shouji.png';
import jianjie from '../images/jianjie.png';
import fatie from '../images/fatie.png';
import male from '../images/male.png';
import female from '../images/female.png';

const { Sider, Content } = Layout;

export default class Acheck extends Component {
    constructor(){
        super();
        this.state={
            article:{},
            user:{},
            detail:[]
        }
    }
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?articleId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                for(var j=0;j<res[i].cimg.length;j++){
                    res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                }
            }
            res[0].time = standardTime(res[0].time)
            this.setState({
                article:res[0]
            },function(){
                console.log(this.state.article.userId);
                fetch("http://47.98.163.228:3004/users?userId="+this.state.article.userId)
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
                fetch("http://47.98.163.228:3004/detail?userId="+this.state.article.userId)
                .then(res=>res.json())
                .then(res=>{
                    this.setState({
                        detail:res
                    })
                });
            });
        })
    }
    render() {
        return (
            <div className="middle">
                <div style={{height:'30px',borderBottom:'1px dashed #ddd',marginBottom:'25px'}}>
                    <Link to='/tab/article' style={{color:'#1890ff',fontSize:'20px'}}>社区文章管理</Link>
                </div>
                <Layout>
                    <Content style={{background:'#fff',borderRight:'1px dashed #ddd'}}>
                        <div style={{borderBottom:'1px solid #ddd',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                            <div>
                                <img src={this.state.article.userPic} alt="头像" style={{width:'50px',heihgt:'50px',borderRadius:'50%',margin:'0 10px'}} />
                                <span style={{fontSize:'20px'}}>{this.state.article.userName}</span>
                            </div>
                            <div style={{width:'340px',display:'flex',justifyContent:'space-around',alignItems:'flex-end'}}>
                                <span>发布于{this.state.article.time}</span>
                                <span>收藏数 {this.state.article.save}</span>
                                <span>点赞数 {this.state.article.agree}</span>
                                <span>评论数 {this.state.article.review}</span>
                            </div>
                        </div>
                        <p style={{textIndent:'25px',fontSize:'16px',lineHeight:'22px',padding:'15px'}}>{this.state.article.content}</p> 
                        {
                            (this.state.article.cimg || []).map((item)=>(<img src={item} style={{width:'70%',margin:'10px 15%'}} />))
                        }
                    </Content>
                    <Sider theme="light" style={{padding:'10px'}}>
                        <span style={{fontSize:'16px',fontFamily:'youyuan'}}>作者信息</span>
                        <Link to={'/tab/ucheck/'+this.state.user.userId}>
                            <div style={{width:'100%',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                <img src={this.state.user.userPic} alt="个人头像" style={{width:'50px',heihgt:'50px',borderRadius:'50%',margin:'10px 0'}} />
                                <span style={{color:'#444'}}>
                                    {this.state.user.userName}
                                    <img src={this.state.user.userSex=='男'?male:female} style={{width:'18px'}}/>
                                </span>
                            </div>
                        </Link>
                        <ul>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={zhanghao} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                账号：{this.state.user.userId}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={chengshi} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                城市：{this.state.user.userProvince}/{this.state.user.userCity}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={shouji} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                手机：{this.state.user.userPho}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={fatie} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                发帖：{this.state.detail[0]}
                            </li>
                            <li style={{width:'100%',padding:'10px 0 5px 0',borderBottom:'1px solid #ddd'}}>
                                <img src={jianjie} alt="alt" style={{width:'20px',marginRight:'8px'}}/>
                                简介：{this.state.user.userIntro}
                            </li>
                        </ul>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
