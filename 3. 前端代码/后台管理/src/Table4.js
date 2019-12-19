import React, { Component } from 'react'
import shanchu from './删 除 .png'
import tianjia from './添加.png'

import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
export default class Table4 extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8086/office')
        .then(res=>res.json())
        .then(res=>{      
            this.setState({
                ress:res
            },function(){
                console.log(this.state.ress)
            })
        })
    }
    shanchu=(idx)=>{
        fetch("http://47.98.163.228:8086/officeDelete?offId="+idx);
        fetch('http://47.98.163.228:8086/office')
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
                                官方消息
                            </h1>
                            <Link to='/tianjiaxiaoxi'>
                                <img src={tianjia} style={{width:'2%'}}/>添加官方消息
                            </Link>
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
                                            <th style={{textAlign:'center'}}>消息ID</th>
                                            <th style={{textAlign:'center'}}>内容</th>
                                            <th style={{textAlign:'center'}}>发表时间</th>
                                            <th style={{textAlign:'center'}}>城市</th>
                                            <th style={{textAlign:'center'}}>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala">
                                                    <td>{item.offId}</td>
                                                    <td style={{width:'600px', textAlign:'left'}}>{item.offContent}</td>
                                                    <td class="center">{item.offTime}</td>
                                                    <td class="center">{item.city}</td>
                                                    <td class="center" onClick={()=>this.shanchu(item.offId)}><img src={shanchu} style={{width:'10%'}}/></td>
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
