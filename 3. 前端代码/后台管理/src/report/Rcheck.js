import React, { Component } from 'react'
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import { Radio, Input } from 'antd';
import {standardTime} from '../common/standardTime';

export default class Rcheck extends Component {
    constructor(){
        super();
        this.state=({
            report:{},
            value: '禁止发帖3天',
            operate: false
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/getReport?id='+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                res[i].rptime = standardTime(res[i].rptime)
                res[i].time = standardTime(res[i].time)
            }
            this.setState({
                report:res[0]
            },function(){
                console.log(this.state.report);
            })
        }) 
    }
    onChange = e => {
        this.setState({
          value: e.target.value,
        });
    };
    onPost = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        if(this.state.value == '驳回举报'){
            fetch('http://47.98.163.228:3004/upReport?check=0&result=驳回举报&time='+date+'&id='+this.props.match.params.id)
            .then(res=>res.json())
            .then(res=>{
                console.log('成功处理举报信息');
            }) 
        }else{
            fetch('http://47.98.163.228:3004/upReport?check=1&result=举报成功&time='+date+'&derp='+this.state.value+'&id='+this.props.match.params.id)
            .then(res=>res.json())
            .then(res=>{
                console.log('成功处理举报信息');
            }) 
        }
        fetch('http://47.98.163.228:3004/getReport?id='+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                res[i].rptime = standardTime(res[i].rptime)
                res[i].time = standardTime(res[i].time)
            }
            this.setState({
                report:res[0]
            },function(){
                console.log(this.state.report);
            })
        }) 
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
          const { value } = this.state;
        return (
            <div>
                <div id="page-wrapper">
                <div style={{backgroundColor:'white',padding:'30px'}}>
                    <div style={{height:'50px'}}>
                        <Link to='/tab/report'  style={{color:'#1890ff',fontSize:'20px'}}> 举报信息管理</Link>
                    </div>
                        <div>
                            <div style={{backgroundColor:'white',height:'65px',borderBottom:'1px #ddd solid'}}>
                                <img src={this.state.report.userPic} alt='' style={{width:'60px',borderRadius:'60px',float:'left'}} />
                                <h3 style={{float:'left',marginTop:'15px',marginLeft:'10px'}}>{this.state.report.userName}</h3>
                                {
                                    this.state.report.result != '待处理'?(
                                        <div>
                                        <span style={{float:'left',marginLeft:'80px',marginTop:'15px',color:'green'}}>{this.state.report.result}</span></div>
                                    ):(
                                        <span style={{float:'left',marginLeft:'80px',marginTop:'15px',color:'red'}}>{this.state.report.result}</span>
                                    )
                                }
                                
                            </div>
                            <div style={{backgroundColor:'white',marginLeft:'10px',marginTop:'10px'}}>
                                <span style={{fontWeight:'bolder'}}>举报时间：</span><span>{this.state.report.rptime}</span>
                                <br/>
                                <span style={{fontWeight:'bolder'}}>被举报文章ID：</span><span><Link to={'/tab/acheck/'+this.state.report.articleId}>{this.state.report.articleId}</Link></span>
                                <br/>
                                <span style={{fontWeight:'bolder'}}>举报类型：</span><span>{this.state.report.rptype}</span>
                            </div>
                            {
                                this.state.report.result != '待处理'
                                ?(
                                    <div style={{backgroundColor:'white',marginLeft:'10px',marginTop:'10px'}}>
                                        <span style={{fontWeight:'bolder'}}>处理时间：</span><span>{this.state.report.time}</span>
                                        <br/>
                                        <span style={{fontWeight:'bolder'}}>处理结果：</span><span>{this.state.report.derp?this.state.report.derp:'无处理'}</span>
                                    </div>
                                ):(
                                    this.state.operate
                                    ?(<div style={{margin:'15px',borderTop:'1px dashed #ddd',padding:'5px'}}>
                                        <Radio.Group onChange={this.onChange} value={value}>
                                            <Radio style={radioStyle} value='禁止发帖3天'>禁止发帖3天</Radio>
                                            <Radio style={radioStyle} value='禁止发帖7天'>禁止发帖7天</Radio>
                                            <Radio style={radioStyle} value='驳回举报'>驳回举报</Radio>
                                        </Radio.Group>
                                        <br />
                                        <button style={{margin:'10px',padding:'5px 15px',border:'1px solid #1890ff',borderRadius:'5px',background:'#1890ffcc',color:'#fff'}} onClick={()=>this.onPost()}>确定</button>
                                        <button style={{margin:'0 5px',padding:'5px 15px',border:'1px solid #1890ff',borderRadius:'5px',background:'#1890ffcc',color:'#fff'}} onClick={()=>this.setState({operate:false})}>取消</button>
                                    </div>)
                                    :(<button style={{margin:'10px',padding:'5px 15px',border:'1px solid #1890ff',borderRadius:'5px',background:'#1890ffcc',color:'#fff'}} onClick={()=>this.setState({operate:true})}>处理</button>)
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

