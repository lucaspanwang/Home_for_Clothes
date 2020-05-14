import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Table from '../common/Table';

import shanchu from '../images/shanchu.png'
import tianjia from '../images/tianjia.png'

export default class Users extends Component {
    constructor(){
        super();
        this.state=({
            thead:['用户ID','头像','昵称','性别','手机号','所在城市','简介','操作'],
            keys:['userId','userPic','userName','userSex','userPho','userCity','userIntro',''],
            tbody:[],
            str:'',
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

    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>用户信息管理</span>
                <Table thead={this.state.thead} keys={this.state.keys} tbody={this.state.tbody} twidth={[10,10,15,5,10,10,25,15]} />
                {/* <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                用户
                            </h1>
                        </div>
                    </div>	
                    <div class="row">
                    <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:'center'}}>昵称</th>
                                            <th style={{textAlign:'center'}}>id</th>
                                            <th style={{textAlign:'center'}}>密码</th>
                                            <th style={{textAlign:'center'}}>城市</th>
                                            <th style={{textAlign:'center'}}>手机号</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala">
                                                    <td>{item.userName}</td>
                                                    <td>{item.userId}</td>
                                                    <td>{item.userPwd}</td>
                                                    <td>{item.userCity}</td>
                                                    <td>{item.userPho}</td>
                                                </tr>
                                            ))
                                            }
                                    </tbody>
                                </table>
                            </div>                       
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div> */}
            </div>
        )
    }
}
