import React, { Component } from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Table from '../common/Table';

export default class Feedback extends Component {
    constructor(){
        super();
        this.state=({
            thead:['反馈ID','用户名','内容','联系方式','反馈时间','是否回复'],
            keys:['fbId','userName','fbContent','fbtel','fbTime','huifu'],
            tbody:[],
            str:'',
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3000/fankuiall')
        .then(res=>res.json())
        .then(res=>{    
            for(var i=0;i<res.length;i++){
                res[i].fbTime = this.formatUTC(res[i].fbTime);
                if(res[i].huifu){
                    res[i].huifu = '已回复';
                }else{
                    res[i].huifu = (<Link to={'/tab/huifu/'+res[i].fbId} style={{color:'red'}}>待回复</Link>);
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
        console.log(id);
    }
    render() {
        return (
            <div>
                <span style={{fontSize:'25px',fontFamily:'Lisu'}}>反馈信息管理</span>
                <Table 
                    thead={this.state.thead} 
                    keys={this.state.keys} 
                    tbody={this.state.tbody} 
                    twidth={[20,15,35,10,10,10]} 
                    operate={['check','delete']} 
                    checkItem={'/fankuixiangqing'}//查看操作跳转的链接
                    deleteItem={this.deleteHandle}
                />
                {/* <div id="page-wrapper">
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="page-header">
                                用户反馈
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
                                            <th style={{textAlign:'center'}}>反馈ID</th>
                                            <th style={{textAlign:'center'}}>用户名</th>
                                            <th style={{textAlign:'center'}}>内容</th>
                                            <th style={{textAlign:'center'}}>联系电话</th>
                                            <th style={{textAlign:'center'}}>反馈时间</th>
                                            <th style={{textAlign:'center'}}>是否回复</th>
                                            <th style={{textAlign:'center'}}>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ress.map((item,idx)=>(
                                                <tr id="lalala" key={idx}>
                                                    <td>{item.fbId}</td>
                                                    <td>{item.userName}</td>
                                                    <td style={{width:'400px', textAlign:'left'}}>{item.fbContent}</td>
                                                    <td>{item.fbtel}</td>
                                                    <td class="center">{this.formatUTC(item.fbTime)}</td>
                                                    {
                                                       item.fbimg=='已回复'?(
                                                        <td class="center">{item.fbimg}</td>
                                                       ):(
                                                        <td class="center"><Link to={'/tab/huifu/'+item.fbId}  style={{color:'red'}}>{item.fbimg}</Link></td>
                                                       ) 
                                                    }
                                                    <td class="center"><Link to={'/tab/fankuixiangqing/'+item.fbId}>查看详情</Link></td>
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
