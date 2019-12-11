import React, { Component } from 'react'
import shanchu from './删 除 .png'
import tianjia from './添加.png'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
export default class Table2 extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8088/users')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                ress:res
            },function(){
                console.log(this.state.ress)
            })
        })
    }

    render() {
        return (
            <div>
                <div id="page-wrapper">
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
            </div>
            </div>
        )
    }
}
