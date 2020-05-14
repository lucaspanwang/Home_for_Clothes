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
            thead:['消息ID','标题','发布内容','发布时间','操作'],
            keys:['offId','offTitle','offContent','offTime',''],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/office')
        .then(res=>res.json())
        .then(res=>{     
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
    // shanchu=(idx)=>{
    //     fetch("http://47.98.163.228:3004/officeDelete?offId="+idx);
    //     fetch('http://47.98.163.228:3004/office')
    //     .then(res=>res.json())
    //     .then(res=>{      
    //         this.setState({
    //             ress:res
    //         },function(){
    //             console.log(this.state.ress)
    //         })
    //     })
    // }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>官方消息管理</span>
                <Table thead={this.state.thead} keys={this.state.keys} tbody={this.state.tbody} twidth={[10,20,45,10,15]}/>
                {/* <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                官方消息
                            </h1>
                            <Link to='/tab/addofficial'>
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
            </div> */}
            </div>
        )
    }
}
