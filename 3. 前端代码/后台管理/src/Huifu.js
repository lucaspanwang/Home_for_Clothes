import React, { Component } from 'react'
import { Link,Route, HashRouter as Router } from 'react-router-dom';
import { Toast} from 'antd-mobile';
import { Input } from 'antd';
const { TextArea } = Input;

export default class Huifu extends Component {
    constructor(){
        super();
        this.state=({
            ress:[],
            value:''
        })
    }
    componentDidMount(){
        fetch('http://47.98.163.228:3000/fankuiall/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            {   
                for(var i=0;i<res.length;i++){
                    var j = res[i].userPic.indexOf('/');
                    res[i].userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j);      
                }
                console.log(res);
                this.setState({
                    ress:res
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
    onChange1 = (e) => {
        this.setState({ value:e.target.value });
    };
    onFail=()=>{
        Toast.offline('回复上传不能为空',2);
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    onToast=()=>{
        Toast.loading('反馈上传中...',2, () => {
            window.location.href = window.location.href.split('/')[0]+"/tab/table5";
        });
    }
    onPost=()=> { 
        if(this.state.value == '' ){
            this.onFail();
        }else{
            fetch('http://47.98.163.228:3000/fankuiadd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                // credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                body:JSON.stringify({huifu:'[衣舍官方回复]'+ this.state.value,fbId:this.props.match.params.id}) 
            })
            this.onToast();
        }
    }
    render() {
        return (
            <div>
                <div id="page-wrapper">
                <div style={{backgroundColor:'white',padding:'30px'}}>
                    <div style={{height:'50px'}}>
                        <Link to='/tab/table5'  style={{color:'black'}}>&#60; &nbsp;用户反馈</Link>
                    </div>
                    {
                        this.state.ress.map((item,idx)=>
                            <div>
                                <div style={{backgroundColor:'white',height:'65px',borderBottom:'1px #ddd solid'}}>
                                    <img src={this.state.ress[0].userPic} alt='' style={{width:'60px',borderRadius:'60px',float:'left'}} />
                                    <h3 style={{float:'left',marginTop:'15px',marginLeft:'10px'}}>{this.state.ress[0].userName}</h3>
                                    <span style={{float:'left',marginLeft:'80px',marginTop:'15px',color:'red'}}>待回复</span>
                                </div>
                                <div style={{backgroundColor:'white',marginLeft:'10px',marginTop:'10px'}}>
                                    <span style={{fontWeight:'bolder'}}>时间：</span><span>{this.formatUTC(this.state.ress[0].fbTime)}</span>
                                    <br/>
                                    <span style={{fontWeight:'bolder'}}>联系电话：</span><span>{this.state.ress[0].fbtel}</span>
                                    <br/>
                                    <span style={{fontWeight:'bolder'}}>问题：</span><span>{this.state.ress[0].fbContent}</span>
                                    <br/>
                                    <br/>
                                    <span style={{fontWeight:'bolder'}}>衣舍官方回复：</span>
                                    <br/>
                                    <TextArea style={{width:'300px',backgroundColor:'rgb(252,251,251)',marginTop:'5px'}}
                                        value={this.state.value}
                                        onChange={this.onChange1}
                                        placeholder="解决方法为..."
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                    <br/>
                                    <button style={{width:'60px',height:'35px',border:'none',backgroundColor:'#008cff',fontSize:'15px',color:'white',borderRadius:'8px',marginTop:'20px'}} onClick={this.onPost}>提交</button>
                                </div>
                            </div>
                    )}
                    
                </div>
               
                </div>
            </div>
        )
    }
}
