import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Typography } from 'antd';
import Table from '../common/Table';

const { Paragraph } = Typography;

export default class Article extends Component {
    constructor(){
        super();
        this.state=({
            thead:['文章ID','发布内容','点赞数','收藏数','评论数','上传人','上传时间'],
            keys:['articleId','content','agree','save','review','userName','time'],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/article')
        .then(res=>res.json())
        .then(res=>{   
            for(var i=0;i<res.length;i++){
                res[i].content = (<Paragraph ellipsis={{rows:2}}>{res[i].content}</Paragraph>)
            }  
            this.setState({
                tbody:res
            },function(){
                console.log(this.state.tbody)
            })
        })
    }
    //删除操作 从子组件获取到的id  添加一个判断是否删除
    deleteHandle = (id) =>{
        console.log(id);
        fetch("http://47.98.163.228:3004/articleDelete?articleId="+id)
        .then(res => res.json())
        .then(res => {
            console.log('删除成功');
        })
        fetch('http://47.98.163.228:3004/article')
        .then(res=>res.json())
        .then(res=>{   
            for(var i=0;i<res.length;i++){
                res[i].content = (<Paragraph ellipsis={{rows:2}}>{res[i].content}</Paragraph>)
            }  
            this.setState({
                tbody:res
            },function(){
                console.log(this.state.tbody)
            })
        })
    }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>社区文章管理</span>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[10,46,8,8,8,10,10]} 
                    operate={['check','delete']} 
                    checkItem={'/acheck'}//查看操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
            </div>
        )
    }
}
