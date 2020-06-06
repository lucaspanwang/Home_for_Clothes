import React, { Component} from 'react';
import { NavBar,Modal } from 'antd-mobile';
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import { Timeline,Icon } from 'antd';
import './diary.css';

import del from '../../images/lajitong.png';
import diaryadd from '../../images/diaryadd.png';
import fanhui from '../../images/fanhui_1.png';
import date from '../../images/date.png';

var diaryIds = []; 

const alert = Modal.alert;

export default class Diary extends Component {
    constructor(){
        super();
        this.state = {
            data: ['1', '2'],
            content:[],
            date:''
        }
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + '/'+arr[1]+'/'+str;
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
                this.setState({
                    content: res,
                })
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
    inputChange(e){
        console.log(e.target.value)
        this.setState({
            date:e.target.value
        })   
    }
    getInputValue(){
        var date = this.state.date;
        if(date){
            this.props.history.push({
                pathname: "/diarysearch/"+this.props.match.params.id+'/'+date,
                state: {
                    date: date
                }
            })
        }else{
            var now = new Date();
            var month= now.getMonth() + 1;
            if(month<10){
                month='0'+month;
            }
            date = now.getFullYear() + '-' + month;
            this.setState({
                date:date
            })
            
        }
        this.props.history.push("/diarysearch/"+this.props.match.params.id+'/'+date)
    }
    
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={[
                    <Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="f62"/></Link>
                ]}
                >穿搭日记</NavBar>
                <NavBar></NavBar>
                <div style={{width:'100%',height:'120px'}}>
                    <Link to={"/diaryadd/"+this.props.match.params.id}>
                        <div style={{width:'100px',height:'120px',marginTop:'10px',float:'left',marginLeft:'10px',marginRight:'20px'}}>
                            <img src={diaryadd} alt='' style={{width:'100px'}} key='add'/>
                            <p style={{textAlign:'center',lineHeight:'20px',color:'#000'}} >写日记</p>
                        </div>
                    </Link> 
                    <div style={{height:'120px',marginTop:'30px',float:'left',marginLeft:'10px',marginRight:'20px'}}>
                        <p style={{lineHeight:'20px',color:'#000',fontSize:'15px'}} >日记搜索：</p>
                        <div>
                            <div style={{width:'30px',height:'30px',float:'left',border:'1px solid #703ce8',borderRight:'none',paddingLeft:'3px'}}>
                                <img src={date} alt='' style={{width:'28px',height:'28px'}}/>
                            </div>
                            <input type="month" name="user_date" 
                                   style={{width:'120px',height:'30px',border:'1px solid #703ce8',paddingLeft:'5px',borderLeft:'none',float:'left',background:'white'}} 
                                   onChange={(e)=>this.inputChange(e)}
                            />
                           
                            <button style={{width:'40px',height:'30px',border:'1px solid #703ce8',borderLeft:'none',float:'left'}}
                                onClick={()=>this.getInputValue()}
                            >搜索</button>
                           
                        </div>
                    </div>                  
                </div>  
                              
                <Timeline style={{marginLeft:'20px',marginTop:'30px'}}>
                {
                    this.state.content.map((item,idx)=>
                        <Timeline.Item dot={<Icon type="heart" theme="filled" style={{ fontSize: '16px' }} key={idx}/>} color="red" key={idx}>
                            <div style={{width:'95%',padding:'10px',border:'2px solid #ccc',borderRadius:'10px'}}>
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
                                    
                                <p style={{color:'#888'}}>{this.formatUTC(item.diaryTime)} <img src={del} alt='' style={{width:'15px',float:'right'}} 
                                // onClick={()=>this.deleteItem(idx)}
                                onClick={() =>
                                    alert('删除', '你确定要删除该日记吗？', [
                                      { text: '取消', onPress: () => console.log('cancel') },
                                      { text: '确定', onPress: () => this.deleteItem(idx) },
                                    ])
                                  }
                                /></p>
                            </div>    
                        </Timeline.Item>
                    )
                }
                </Timeline>           
            </div>    
        );
    }
}
