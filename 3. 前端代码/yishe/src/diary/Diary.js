import React, { Component} from 'react';
import { NavBar,Carousel,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Timeline,Icon } from 'antd';
import './diary.css';

import del from '../images/垃圾桶.png';
import add from '../images/添加.png';
import lunbo01 from '../images/lunbo01.jpg';
import lunbo02 from '../images/lunbo02.jpg';

var diaryIds = []; 

export default class Diary extends Component {
    constructor(){
        super();
        this.state = {
            data: ['1', '2'],
            content:[],
        }
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    componentDidMount() {
        fetch('http://47.98.163.228:8081/diary?userId='+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            {            
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:8081"+res[i].userPic.substr(j);  
                    diaryIds.push(res[i].diaryId);    
                }
                for(var i=0;i<res.length;i++){
                    if(res[i].dimg[0]===''){
                        res[i].dimg=[];
                    }else{
                        for(var j=0;j<res[i].dimg.length;j++){
                            var n = res[i].dimg[j].indexOf('/');
                            res[i].dimg[j] = "http://47.98.163.228:8081"+res[i].dimg[j].substr(n);
                        }
                    }
                }               
                this.setState({
                    content: res,
                })
            }
        })
        setTimeout(() => {
            this.setState({
            data: [lunbo01,lunbo02],
            });
        }, 100);    

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
    deleteItem=(id)=>{
        var content = [...this.state.content];
        content.splice(id,1);
        this.setState({
           content:content,
        })
        // diaryIds[id]='0';
        var diarys = diaryIds;
        var diaryId = diarys[id];
        diarys.splice(id,1);

        fetch('http://47.98.163.228:8081/diaryDel',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({diaryId:diaryId}) 
        })
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                rightContent={[
                    <Link to={"/diaryadd/"+this.props.id}>
                        <img src={add} alt='' style={{width:'25px'}} key='add'/>
                    </Link>
                ]}>穿搭日记</NavBar>
                <div style={{position:"relative"}}>
                    <Carousel autoplay={true} infinite>
                    {this.state.data.map(val => (
                        <a key={val} style={{ display: 'inline-block', width: '100%', height: '150px' }}>
                        <img
                            src={val}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                    {
                        this.state.content.map((item,idx)=>( <img src={this.state.content[0].userPic} alt='' style={{width:'15%',borderRadius:'50%',position: 'absolute',top:'85%',left:'0',zIndex:"99"}}  key={idx}/>))
                    }
                   
                </div>                
                <Timeline style={{marginLeft:'20px',marginTop:'30px'}}>
                {
                    this.state.content.map((item,idx)=>
                        <Timeline.Item dot={<Icon type="heart" theme="filled" style={{ fontSize: '16px' }} key={idx}/>} color="red">
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px'}}>
                            <Grid data={item.dimg}
                                columnNum={3}
                                renderItem={dataItem => (
                                    <img src={dataItem} alt="" style={{width:'100%'}}/>
                                )}
                                />
                                <p style={{color:'#1f8774',marginTop:'8px'}}>{item.diaryContent}</p>
                                <span style={{color:'#888'}}>{this.formatUTC(item.diaryTime)} <img src={del} alt='' style={{width:'7%',float:'right'}} onClick={()=>this.deleteItem(idx)}/></span>
                            </div>    
                        </Timeline.Item>
                    )
                }
                </Timeline>           
            </div>
            
        );
    }
}
