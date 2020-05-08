import React, { Component } from 'react';
import { NavBar, Toast, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import '../me.css';
import ArticleModule from '../../community/common/ArticleModule';

import tianjia from '../../images/tianjia.png';
import fanhui from '../../images/fanhui_1.png';

export default class myArticle extends Component {
    constructor(){
        super();
        this.state = {
            users:[],
        }
    }   
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                users:res
            })
        });
    }
    //删帖
    deleteArticle=(id)=>{
        fetch("http://47.98.163.228:3004/articleDelete?articleId="+id)
        .then(ress=>{
            Toast.loading('正在删除...', 0.8, () => {
                Toast.success('成功删除文章！',0.6,()=>{
                    window.location.reload(true); 
                });
            });
        });
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={<Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="fantttt"/></Link>}
                rightContent={<Link to={"/articleadd/"+this.props.match.params.id}><img src={tianjia} style={{width:"20px"}}/></Link>}
                >发帖</NavBar>
                <NavBar></NavBar>
                <SearchBar placeholder="请输入你要查找的文章" maxLength={15} style={{backgroundColor:'#ccc'}}/>
                {
                    this.state.users.map((item)=>(
                        <ArticleModule articleId={item.articleId} userId={this.props.match.params.id} place="index"  operation="delete" deleteItem={this.deleteArticle}/>
                    ))
                }
            </div>
        );
    }
}