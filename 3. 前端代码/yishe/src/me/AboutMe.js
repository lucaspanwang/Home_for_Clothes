import React, { Component } from 'react'
import { NavBar,List} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import {Tooltip} from 'antd';

import fanhui from '../images/fanhui_1.png';
import girl from '../images/girl.gif';
import boy from '../images/boy.gif';

const Item = List.Item;
const text = '你看我是不是很漂亮？٩(๑❛ᴗ❛๑)۶我也觉得人家很漂亮呢(＾▽＾)';
const text1 = '人见人爱，花见花开，车见爆胎。哥一直在被追赶，但从未被超越过。';
var num =1;
export default class AboutMe extends Component {
    constructor(){
        super();
        this.state = {
            user:{},
            previewPic:'',
            sex:'', 
            name:'',
            info:'',
            city:'',
            display:'none'
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        fetch("http://47.98.163.228:3000/users/"+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j);
            }
            var newInfo = res[0].userIntro.length>12?res[0].userIntro.substr(0,12)+'...':res[0].userIntro;
            this.setState({
                user:res[0],
                previewPic:res[0].userPic,
                info:newInfo,
                name:res[0].userName,
                city:res[0].userCity,
                sex:res[0].userSex
            })
        })
    }
    onClick3 = ()=>{
        if(num == 1){
            this.setState({ display:'block' });
            num = num+1;  
        }else{
            this.setState({ display:'none' });
            num = num-1;
        }
    }
    //头像
    handleUpload(e) {
        console.log(e.target.files[0]);
        const reader = new FileReader();
        // 读取文件内容，结果用data:url的字符串形式表示
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(e) {
            this.setState({
                previewPic: e.target.result
            },function(){
                console.log('this.state.previewPic'+this.state.previewPic)
                fetch('http://47.98.163.228:3000/changePic',{
                    method: 'post', 
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true,
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    },
                    body:JSON.stringify({pic:this.state.previewPic,userId:this.props.match.params.id}) 
                })
            });
        }.bind(this);

    }
    //向后端传值
    onPost=()=> { 
        fetch('http://47.98.163.228:3000/changePic',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            // credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({pic:this.state.previewPic,userId:this.props.match.params.id}) 
        })
    }
     
    render() {
        return (
           
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={fanhui} style={{width:'30px'}} key="fankk" onClick={()=>{localStorage.setItem('comee',1);}}/></Link>
                ]}
                >个人中心</NavBar>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine style={{position:"relative",height:'20%'}} onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>头像</span>
                       <input id='ddd' type="file" style={{width:'12%',height:'100%',position: 'absolute',top: '10%',left:'80%', Zindex: '9999',opacity:'0'}} onChange={this.handleUpload}/> 
                       <img id="gzzImg"  src={this.state.previewPic} alt='' style={{width:'12%',height:'12%',float:'right'}}/>
                    </Item>
                    <Item arrow="empty" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>账号</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userId}</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>性别</span>
                       <Link to={"/sex/"+this.props.match.params.id} style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.sex}</Link>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>昵称</span>
                       <Link to={"/name/"+this.props.match.params.id} style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.name}</Link>
                    </Item>
                    
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>城市</span>
                       <Link to={"/city/"+this.props.match.params.id} style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.city}</Link>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>简介</span>
                       <Link to={"/info/"+this.props.match.params.id}  style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.info}</Link>
                    </Item>
                </List>
                {/* <Tooltip placement="right" title={this.state.sex==='女'?text:text1}>
                    
                </Tooltip> */}
                <div>
                    <img src={this.state.sex==='女'?girl:boy} alt='' style={{width:'30%',height:'40%',marginLeft:'10%',float:'left'}} onClick={this.onClick3}/>
                    <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',height:'120px',display: this.state.display,border:'3px solid #fc9d9a',borderRadius:'10px',padding:'10px'}}>
                        <span >
                            {this.state.sex==='女'?text:text1}
                        </span>
                    </div>
                </div>     
            </div>
        );
    }
}
