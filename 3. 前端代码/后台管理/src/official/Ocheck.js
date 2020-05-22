import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import {standardTime} from '../common/standardTime';

const { Sider, Content } = Layout;

export default class Ocheck extends Component {
    constructor(){
        super();
        this.state={
            office:{}
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        fetch("http://47.98.163.228:3004/office?officeId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                res[i].offImg = "http://47.98.163.228:3004"+res[i].offImg;
                res[i].offTime = standardTime(res[i].offTime);
                for(var j=0;j<res[i].offPic.length;j++){
                    res[i].offPic[j] = "http://47.98.163.228:3004"+res[i].offPic[j];
                }
            }
            this.setState({
                office:res[0],
            },function(){
                console.log(this.state.office);
            })
        });
    }
    render() {
        return (
            <div className="middle">
                <div style={{height:'30px',borderBottom:'1px dashed #ddd',marginBottom:'25px'}}>
                    <Link to='/tab/official' style={{color:'black'}}>&#60; &nbsp;官方消息</Link>
                </div>
                <Layout>
                    <Content style={{background:'#fff',borderRight:'1px dashed #ddd'}}>
                        <div style={{textAlign:'center',borderBottom:'1px solid #ddd',padding:'10px'}}>
                            <p style={{fontSize:'22px',margin:'5px'}}>{this.state.office.offTitle}</p>
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                                <span>发布于{this.state.office.offTime}</span>
                            </div>
                        </div>
                        <p style={{textIndent:'25px',fontSize:'16px',lineHeight:'22px',padding:'15px'}}>{this.state.office.offContent}</p> 
                        {
                            (this.state.office.offPic || []).map((item)=>(<img src={item} style={{padding:'10px 20px'}} />))
                        }
                    </Content>
                    <Sider theme="light" style={{padding:'15px'}}>
                        <span style={{fontSize:'16px',fontFamily:'youyuan'}}>消息封面</span>
                        <img src={this.state.office.offImg} style={{width:'100%',margin:'5px 0'}} />
                    </Sider>
                </Layout>
            </div>
        )
    }
}
