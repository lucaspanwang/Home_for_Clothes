import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import {standardTime} from '../common/standardTime';

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
                <div style={{height:'30px',marginBottom:'15px'}}>
                    <Link to='/tab/users' style={{color:'black'}}>&#60; &nbsp;用户信息</Link>
                </div>
                <Layout>
                    <Content style={{background:'#fff',borderRight:'1px dashed #ddd'}}>
                        <div style={{borderBottom:'1px solid #ddd',padding:'10px',display:'flex',justifyContent:'space-between'}}>
                            <div>
                                <img src={this.state.user.userPic} alt="头像" style={{width:'50px',heihgt:'50px',borderRadius:'50%',margin:'0 10px'}} />
                                <span style={{fontSize:'20px'}}>{this.state.user.userName}</span>
                            </div>
                        </div>
                    </Content>
                    <Sider theme="light" style={{padding:'15px'}}>
                        <span style={{fontSize:'16px',fontFamily:'youyuan'}}>个人信息</span>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
