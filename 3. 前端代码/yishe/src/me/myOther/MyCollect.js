import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import { Link } from 'react-router-dom';

import fanhui from '../../images/fanhui_1.png';
import ArticleModule from '../../community/common/ArticleModule';

export default class MyCollect extends Component {
    constructor(){
        super();
        this.state = {
            collect:[]
        }
    }    
    componentDidMount(){
        fetch("http://47.98.163.228:3004/collect?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                collect:res
            },function(){
                console.log(this.state.collect);
            })
        })
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                  <Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                >收藏</NavBar>
                <NavBar></NavBar>
                {
                    this.state.collect.map((item)=>(
                        <ArticleModule articleId={item.articleId} userId={this.props.match.params.id} place="index"/>
                    ))
                }
            </div>
        );
    }
}