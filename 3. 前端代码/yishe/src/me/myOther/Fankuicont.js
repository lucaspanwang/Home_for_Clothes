import React, { Component } from 'react';
import { NavBar,Grid , Accordion, List} from 'antd-mobile';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';

var fankuis = []; 
var users = [];

export default class Fankuicont extends Component {
    constructor(){
        super();
        this.state = {
            content:[],
            report:[],
            user:[]
        }
    }
    componentDidMount() {
        fetch('http://47.98.163.228:3000/fankui/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {    
                for(var i=0;i<res.length;i++){
                    res[i].fbTime = this.formatUTC(res[i].fbTime).split(' ')[0];
                    console.log(res[i].fbTime);   
                }         
                this.setState({
                    content: res,
                })
                console.log(this.state.content)
            }
        }) 
        fetch('http://47.98.163.228:3000/reports/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                for(var i = 0;i<res.length;i++) {
                    fetch('http://47.98.163.228:3000/users/'+res[i].rperId)
                    .then(res=>res.json())
                    .then(res=>{
                        {    
                            users.push(res[0].userName)        
                            this.setState({
                                user: users,
                            })
                            console.log(this.state.user)
                        }
                    }) 
                }             
                this.setState({
                    report: res,
                })
                console.log(this.state.report)
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
        return beijing_datetime;
    }
    onChange = (key) => {
        console.log(key);
    } 
    render() {
        return (
            <div>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/myfankui/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan66"/></Link>
                ]}
                >我的反馈</NavBar>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="反馈" className="pad">
                            <List className="my-list">
                            {
                                this.state.content.map((item,idx)=>
                                    <List.Item style={{width:'100%',padding:'10px',borderBottom:'2px solid #ccc'}} key={idx}>
                                        <span>问题：</span>
                                        <span style={{color:'#000'}}>{item.fbContent}</span>
                                        <p style={{float:'right'}}>{item.fbTime}</p>
                                        <p></p>
                                        <span style={{color:'#000',fontSize:'14px'}}>{item.huifu}</span>
                                    </List.Item>    
                                )
                            }
                            </List>    
                        </Accordion.Panel>
                        <Accordion.Panel header="举报" className="pad">
                            <List className="my-list">
                            {
                                this.state.report.map((item,idx)=>
                                    <List.Item style={{width:'100%',padding:'10px',borderBottom:'2px solid #ccc'}} key={idx}>
                                        <span style={{color:'#000'}}>举报：您举报{this.state.user[idx]}发表的文章{item.rptype}</span><br/>
                                        <span style={{color:'red',fontSize:'14px'}}>【举报结果】：{item.result}</span>
                                        <p style={{float:'right'}}>{item.rptime.split('T')[0]}</p>
                                    </List.Item>    
                                )
                            }
                            </List>    
                        </Accordion.Panel>
                    </Accordion>
                </div>    
            </div>
        )
    }
}

