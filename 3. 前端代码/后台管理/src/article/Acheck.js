import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import {standardTime} from '../common/standardTime';
// import Gongge from '../common/Gongge';

const { Sider, Content } = Layout;

export default class Acheck extends Component {
    constructor(){
        super();
        this.state={
            article:{}
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
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
                console.log(this.state.article);
            });
        })
    }
    render() {
        return (
            <div className="middle">
                <div style={{height:'30px',marginBottom:'15px'}}>
                    <Link to='/tab/article' style={{color:'black'}}>&#60; &nbsp;社区文章</Link>
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
                    <Sider theme="light" style={{padding:'15px'}}>
                        <span style={{fontSize:'16px',fontFamily:'youyuan'}}>作者信息</span>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
