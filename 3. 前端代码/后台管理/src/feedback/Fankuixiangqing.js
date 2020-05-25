import React, { Component } from 'react'
import { Link,Route, HashRouter as Router } from 'react-router-dom';

export default class Fankuixiangqing extends Component {
    constructor(){
        super();
        this.state=({
            ress:[]
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3004/upfeedback?fbId='+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
        }) 
        fetch('http://47.98.163.228:3000/fankuiall/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j); 
                    if(res[i].huifu){
                        res[i].huifu =  res[i].huifu.split(']')[1];   
                    }     
                }
                console.log(res);
                this.setState({
                    ress:res,
                    userName:res[0].userName
                })  
                console.log(this.state.ress[0].userPic) 
            }
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
    
    render() {
        return (
            <div>
                <div id="page-wrapper">
                <div style={{backgroundColor:'white',padding:'30px'}}>
                    <div style={{height:'50px'}}>
                        <Link to='/tab/feedback'  style={{color:'#1890ff',fontSize:'20px'}}> 反馈信息管理</Link>&nbsp;/&nbsp;{this.state.userName}
                    </div>
                    {
                        this.state.ress.map((item,idx)=>
                            <div>
                                <div style={{backgroundColor:'white',height:'65px',borderBottom:'1px #ddd solid'}}>
                                    <img src={this.state.ress[0].userPic} alt='' style={{width:'60px',borderRadius:'60px',float:'left'}} />
                                    <h3 style={{float:'left',marginTop:'15px',marginLeft:'10px'}}>{this.state.ress[0].userName}</h3>
                                    {
                                        this.state.ress[0].huifu?(
                                            <div>
                                            <span style={{float:'left',marginLeft:'80px',marginTop:'15px',color:'green'}}>已回复</span></div>
                                        ):(
                                            <span style={{float:'left',marginLeft:'80px',marginTop:'15px',color:'red'}}>待回复</span>
                                        )
                                    }
                                    
                                </div>
                                <div style={{backgroundColor:'white',marginLeft:'10px',marginTop:'10px'}}>
                                    <span style={{fontWeight:'bolder'}}>时间：</span><span>{this.formatUTC(this.state.ress[0].fbTime)}</span>
                                    <br/>
                                    <span style={{fontWeight:'bolder'}}>联系电话：</span><span>{this.state.ress[0].fbtel}</span>
                                    <br/>
                                    <span style={{fontWeight:'bolder'}}>问题：</span><span>{this.state.ress[0].fbContent}</span>
                                    <br/>
                                    {
                                        this.state.ress[0].huifu?(
                                            <div>
                                            <span style={{fontWeight:'bolder'}}>衣舍官方回复：</span><span>{this.state.ress[0].huifu}</span></div>
                                        ):(
                                            <div>
                                                <Link to={'/tab/huifu/'+this.props.match.params.id} style={{fontStyle:'italic',fontSize:'12px'}}>&#60;&#60;&#60;&nbsp;点此处回复</Link>
                                            </div>
                                        )
                                    }
                                    
                                    <br/>
                                    
                                </div>
                            </div>
                    )}
                    
                </div>
               
                </div>
            </div>
        )
    }
}

