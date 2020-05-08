import React, { Component } from 'react';
import { NavBar, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';

import ArticleModule from './common/ArticleModule';
import './community.css';

import tianjia from '../images/tianjia.png';

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[],
            office:[]
        }
    }    
    componentDidMount(){
        console.log(this.props.id);
        fetch("http://47.98.163.228:3004/office?limit=2")
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                res[i].offImg = "http://47.98.163.228:3004"+res[i].offImg;
            }
            this.setState({
                office:res,
            })
        });
        fetch("http://47.98.163.228:3004/article")
        .then(res=>res.json())
        .then(res=>{
            this.setState({users:res})
        });
    }
    render() {
        return (
            <div>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}>社区</NavBar>
                <Link to={"/search/"+this.props.id+"&article"}>
                    <SearchBar placeholder="搜索" style={{backgroundColor:'#ccc'}} disabled/>
                </Link>
                <div style={{width:'100%',height:'100%',overflowY:'scroll'}}>
                    <div className="office">
                        <div className="msg">
                            <span>官方消息</span>
                            <Link to={"/office/"+this.props.id}>查看更多</Link>
                        </div>
                        {
                            this.state.office.map((item)=>(
                                <div className="message">
                                    <img src={item.offImg}/>
                                    <div>
                                        <p className="title">{item.offTitle}</p>
                                        <p>{item.offContent}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        this.state.users.map((item)=>(
                            <ArticleModule articleId={item.articleId} userId={this.props.id} place="index"/>
                        ))
                    }
                </div>
            </div>
        );
    }
}