import React, { Component } from 'react'
import shanchu from './删 除 .png'
import tianjia from './添加.png'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
export default class Table1 extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:8088/people')
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
                                管理员
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
                                            <th style={{textAlign:'center'}}>学号</th>
                                            <th style={{textAlign:'center'}}>姓名</th>
                                            <th style={{textAlign:'center'}}>负责模块</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala">
                                                    <td>{item.xuehao}</td>
                                                    <td>{item.ming}</td>
                                                    <td>{item.mokuai}</td>
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
