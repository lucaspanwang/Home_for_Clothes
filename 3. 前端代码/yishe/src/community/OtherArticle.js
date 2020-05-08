import React, { Component } from 'react';
import { NavBar, Toast, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import ArticleModule from './common/ArticleModule';

import fanhui from '../images/fanhui_1.png';

export default class otherArticle extends Component {
    constructor(){
        super();
        this.onback = this.onback.bind(this);
        this.state = {
            users:[],
        }
    }   
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id.split("&")[0])
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                users:res
            })
        });
    }
    onback=()=>{
        this.props.history.go(-1);
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={<img src={fanhui} style={{width:'30px'}} key="fanother" onClick={this.onback} />}
                // leftContent={<Link to={'/others/'+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fanother"/></Link>}
                >发帖</NavBar>
                <NavBar></NavBar>
                {
                    this.state.users.map((item)=>(
                        <ArticleModule articleId={item.articleId} userId={this.props.match.params.id.split("&")[1]} place="index"/>
                    ))
                }
            </div>
        );
    }
}