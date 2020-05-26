import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Table from '../common/Table';
import {standardTime} from '../common/standardTime.js';

export default class Report extends Component {
    constructor(){
        super();
        this.state=({
            thead:['ID','举报人','被举报人','举报文章','举报类型','举报时间','举报状态','处理时间','处理结果'],
            keys:['Id','rpId','rperId','articleId','rptype','rptime','result','time','derp'],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/getReport')
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                res[i].rptime = this.formatUTC(res[i].rptime);
                if(res[i].result != '待处理'){
                   res[i].time = this.formatUTC(res[i].time); 
                }else{
                    res[i].time = '';
                    res[i].result = (<Link to={'/tab/rcheck/'+res[i].Id} style={{color:'red'}}>{res[i].result}</Link>)
                }
            }
            this.setState({
                tbody:res
            },function(){
                console.log(this.state.tbody)
            })
        })
    }
    formatUTC=(utc_datetime) =>{
        // 转为正常的时间格式 年-月-日 时:分:秒
        var T_pos = utc_datetime.indexOf('T');
        var Z_pos = utc_datetime.indexOf('Z');
        var year_month_day = utc_datetime.substr(0,T_pos);
        var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
        var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06
      
        // 处理成为时间戳
        timestamp = new Date(Date.parse(new_datetime));
        timestamp = timestamp.getTime();
        timestamp = timestamp/1000;
      
        // 增加8个小时，北京时间比utc时间多八个时区
        var timestamp = timestamp+8*60*60;
      
        // 时间戳转为时间
        var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        var time = beijing_datetime.split(' ')[0];
        var tt = time.split('/')[0]+'-'+time.split('/')[1]+'-'+time.split('/')[2];
        return tt;
    } 
    //删除操作 从子组件获取到的id
    deleteHandle = (id) =>{
        // var content = [];
        // for(var i = 0;i<this.state.tbody.length;i++){
        //     if(id !== this.state.tbody[i].fbId){
        //         content.push(this.state.tbody[i])
        //     }
        // }
        // this.setState({
        //     tbody:content
        // })
        // console.log(id);
        // fetch('http://47.98.163.228:3000/fankuiDel',{
        //     method: 'post', 
        //     "Access-Control-Allow-Origin" : "*",
        //     "Access-Control-Allow-Credentials" : true,
        //     // credentials: 'include',
        //     headers: {
        //         'Content-Type': 'multipart/form-data;charset=utf-8'
        //     },
        //     body:JSON.stringify({fbId:id}) 
        // })
    }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>举报信息管理</span>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[10,9,9,10,20,10,10,10,12]} 
                    operate={['check','delete']} 
                    checkItem={'/rcheck'}//查看操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
            </div>
        )
    }
}
