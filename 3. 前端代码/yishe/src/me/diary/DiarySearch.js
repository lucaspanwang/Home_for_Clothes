import React, { Component } from 'react';
import { NavBar,Grid } from 'antd-mobile';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';
import del from '../../images/lajitong.png';
import empty from '../../images/empty.png';

var diarys = []; 
var diaryIds=[];
export default class DiarySearch extends Component {
    constructor(){
        super();
        this.state = {
            content:[]
        }
    }
    componentDidMount() {
        fetch('http://47.98.163.228:3000/diary/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j);  
                    diaryIds.push(res[i].diaryId);    
                }      
                for(var i=0;i<res.length;i++){
                    if(res[i].dimg[0]===''){
                        res[i].dimg=[];
                    }else{
                        for(var j=0;j<res[i].dimg.length;j++){
                            var n = res[i].dimg[j].indexOf('/');
                            res[i].dimg[j] = "http://47.98.163.228:3000"+res[i].dimg[j].substr(n);
                        }
                    }
                } 
                for(var d=0;d<res.length;d++){
                    res[d].diaryTime = this.formatUTC(res[d].diaryTime);
                    console.log(res[d].diaryTime);
                    var date = res[d].diaryTime;
                    var arr = date.split('/');
                    if(arr[1]<10){
                        arr[1]='0'+arr[1];
                    }
                    date = arr[0]+'-'+arr[1];
                    console.log(date);
                    if(date==this.props.match.params.date){
                        diarys.push(res[d]);
                    }
                }               
                this.setState({
                    content: diarys,
                })
                console.log(this.state.content)
            }
        }) 
    }
    componentWillUnmount(){
        diarys=[];
        this.setState({
            content: [],
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
    deleteItem=(id)=>{
        var content = [...this.state.content];
        content.splice(id,1);
        this.setState({
           content:content,
        })
        // diaryIds[id]='0';
        var diaryss = diaryIds;
        var diaryId = diaryss[id];
        diarys.splice(id,1);

        fetch('http://47.98.163.228:3000/diaryDel',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            // credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({diaryId:diaryId}) 
        })
    }
    render() {
        return (
            <div>
                <NavBar style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                    <Link to={"/diary/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan99999"/></Link>
                ]}
                >日记搜索结果</NavBar>
                <NavBar></NavBar>
                {
                   this.state.content.length!==0?(
                    this.state.content.map((item,idx)=>
                        <div style={{width:'100%',padding:'10px',border:'3px solid #ccc'}} key={idx}>
                            <div style={{width:'100%',height:'50px'}}>
                                <img src={this.state.content[0].userPic} alt='' style={{width:'12%',borderRadius:'50%',float:'left'}} />
                                <div style={{paddingTop:'20px'}}>
                                    <span style={{color:'#888'}}>&nbsp;&nbsp;&nbsp;&nbsp;{item.diaryTime} <img src={del} alt='' style={{width:'15px',float:'right'}} onClick={()=>this.deleteItem(idx)}/></span>
                                </div>    
                            </div>
                            <div style={{width:'100%'}}>
                                <p style={{color:'#000',marginBottom:'8px'}}>{item.diaryContent}</p>
                                {
                                    item.dimg.length === 1?(
                                        <div>
                                        {
                                            item.dimg.map((i,d)=>(
                                                <img src={i} alt='' key={d} onClick={()=>{window.location.href=i}} style={{width:'33%',marginBottom:'5px'}}/>
                                            ))
                                        }
                                        </div>
                                       
                                    ):(
                                        <div>
                                        {
                                            item.dimg.map((i,d)=>(
                                                <img src={i} alt='' key={d} onClick={()=>{window.location.href=i}} style={{width:'33%',marginBottom:'5px',height:'100px',objectFit:'contain'}}/>
                                            ))
                                        }
                                        </div>
                                    )
                                }
                                {/* {
                                    item.dimg.map((i,d)=>
                                      <img src={i} alt='' key={d} onClick={()=>{window.location.href=i}} style={{width:'33%'}}/>
                                    )
                                } */}
                            </div>
                        </div>    
                    )
                   )
                   :(
                       <div style={{width:'100%',height:'100%'}}>
                           <img src={empty} alt='' style={{width:'20%',marginTop:'30%',marginLeft:'40%'}}/>
                           <p style={{textAlign:'center',marginTop:'10px'}}>这个月您没有写日记...</p>
                       </div>
                   )

                   
                }
                
            </div>
        )
    }
}

