import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { Typography } from 'antd';
import Table from '../common/Table';

import shanchu from '../images/shanchu.png'
import tianjia from '../images/tianjia.png'

const { Paragraph } = Typography;

export default class Article extends Component {
    constructor(){
        super();
        this.state=({
            thead:['文章ID','发布内容','点赞数','收藏数','评论数','上传人','上传时间','操作'],
            keys:['articleId','content','agree','save','review','userName','time',''],
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
    // shanchu=(idx)=>{
    //     fetch("http://47.98.163.228:3004/articleDelete?articleId="+idx);
    //     fetch('http://47.98.163.228:3004/article')
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
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>社区文章管理</span>
                <Table thead={this.state.thead} keys={this.state.keys} tbody={this.state.tbody} twidth={[10,34,7,7,7,10,10,15]} />
                {/* <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                文章
                            </h1>
                            <Link to='/tab/addarticle'>
                                <img src={tianjia} style={{width:'2%'}}/>添加文章
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
                                            <th style={{textAlign:'center'}}>文章ID</th>
                                            <th style={{textAlign:'center'}}>作者</th>
                                            <th style={{textAlign:'center'}}>内容</th>
                                            <th style={{textAlign:'center'}}>点赞数</th>
                                            <th style={{textAlign:'center'}}>收藏数</th>
                                            <th style={{textAlign:'center'}}>发表时间</th>
                                            <th style={{textAlign:'center'}}>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala">
                                                    <td>{item.articleId}</td>
                                                    <td>{item.userName}</td>
                                                    <td style={{width:'500px', textAlign:'left'}}>{item.content}</td>
                                                    <td>{item.agree}</td>
                                                    <td class="center">{item.save}</td>
                                                    <td class="center">{item.time}</td>
                                                    <td class="center" onClick={()=>this.shanchu(item.articleId)}><img src={shanchu} style={{width:'10%'}}/></td>
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
