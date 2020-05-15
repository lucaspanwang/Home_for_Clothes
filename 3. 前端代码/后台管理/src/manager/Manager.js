import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Table from '../common/Table';

import tianjia from '../images/tianjia.png'

export default class Manager extends Component {
    constructor(){
        super();
        this.state=({
            thead:['管理员ID','姓名','管理模块'],
            keys:['xuehao','ming','mokuai'],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/manager')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                tbody:res
            },function(){
                console.log(this.state.tbody);
            })
        })
    }
    //删除操作 从子组件获取到的id
    deleteHandle = (id) =>{
        console.log(id);
    }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>管理员信息</span>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[33.3,33.3,33.3]} 
                    operate={['edit','delete']} 
                    editItem={'/medit'}//编辑操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
            </div>
        )
    }
}
