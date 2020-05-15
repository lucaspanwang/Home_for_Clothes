import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Table from '../common/Table';

export default class Users extends Component {
    constructor(){
        super();
        this.state=({
            thead:['用户ID','头像','昵称','性别','手机号','所在城市','简介'],
            keys:['userId','userPic','userName','userSex','userPho','userCity','userIntro'],
            tbody:[]
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/users')
        .then(res=>res.json())
        .then(res=>{   
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = (<img src={"http://47.98.163.228:3004"+res[i].userPic.substr(j)} style={{width:40,height:40,borderRadius:'50%'}} />)
            }
            this.setState({
                tbody:res
            },function(){
                console.log(this.state.tbody)
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
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>用户信息管理</span>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[10,10,15,5,15,10,35]} 
                    operate={['check','delete']}
                    checkItem={'/ucheck'}//查看操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
            </div>
        )
    }
}
