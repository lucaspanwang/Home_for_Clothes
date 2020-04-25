import React, { Component } from 'react';
import { NavBar,SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import ArticleModule from './common/ArticleModule';

import fanhui from '../images/fanhui_1.png';
import nodata from '../images/nodata.png';

export default class Search extends Component {
    constructor(){
        super();
        this.state={
            search:'',
            userId:'',
            article:[]
        }
    }
    //搜索框
    componentDidMount(){
        this.setState({
            search:this.props.match.params.id.split('&')[1],
            userId:this.props.match.params.id.split('&')[0],
        })
    }
    onSubmit = (value) => {
        this.setState({article:[]})
        fetch("http://47.98.163.228:3004/articleSearch?value="+value)
        .then(res=>res.json())
        .then(res=>{
            this.setState({article:res})
        });
    }
    render() {
        let message;
        if(this.state.article.length) {
            message = this.state.article.map((item)=>(
                <ArticleModule articleId={item.articleId} userId={this.state.userId} key={item.articleId} place="community"/>
            ))
        }else {
            message = 
            (<div style={{width:"100%",height:"400px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:'column'}}>
                <img src={nodata} style={{width:'60px'}}/>
                <span style={{fontSize:"16px",color:'#bfbfbf'}}>没有搜索到数据</span>
            </div>)
        }
        return (
            <div>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                  <Link to={"/apptab/"+this.state.userId+'&community'}><img src={fanhui} style={{width:'30px'}} key="searchfan"/></Link>
                ]}
                >搜索</NavBar>
                <NavBar></NavBar>
                <SearchBar placeholder="请输入你要查找的内容" maxLength={15} style={{backgroundColor:'#ccc'}} onSubmit={(value)=>this.onSubmit(value)}/>
                {/* 显示搜索内容 */}
                {message}
            </div>
        )
    }
}
