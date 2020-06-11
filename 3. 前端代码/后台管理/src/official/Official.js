import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Typography } from 'antd';
import Table from '../common/Table';

import shanchu from '../images/shanchu.png'
import tianjia from '../images/tianjia.png'

const { Paragraph } = Typography;

export default class Official extends Component {
    constructor(){
        super();
        this.state=({
            thead:['消息ID','标题','发布内容','发布时间'],
            keys:['offId','offTitle','offContent','offTime'],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/office')
        .then(res=>res.json())
        .then(res=>{     
            // console.log(res);
            for(var i=0;i<res.length;i++){
                res[i].offContent = (<Paragraph ellipsis={{rows:2}}>{res[i].offContent}</Paragraph>)
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
        fetch('http://47.98.163.228:3004/officeDelete?offId='+id)
        // .then(res => res.json())
        .then(res => {
            fetch('http://47.98.163.228:3004/office')
            .then(res=>res.json())
            .then(res=>{     
                // console.log(res);
                for(var i=0;i<res.length;i++){
                    res[i].offContent = (<Paragraph ellipsis={{rows:2}}>{res[i].offContent}</Paragraph>)
                }  
                this.setState({
                    tbody:res
                },function(){
                    console.log(this.state.tbody)
                })
            })
            console.log('删除成功');
        })
        
    }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>官方消息管理</span>
                <Link to='/tab/addofficial' style={{fontSize:'16px',color:'#444',float:'right'}}>
                    <img src={tianjia} style={{width:'18px'}}/>添加官方消息
                </Link>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[10,20,55,15]} 
                    operate={['check','delete']}
                    // editItem={'/oedit'}//编辑操作跳转的链接
                    checkItem={'/ocheck'}//查看操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
            </div>
        )
    }
}
