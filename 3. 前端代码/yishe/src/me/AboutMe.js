import React, { Component } from 'react'
import { NavBar,List} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import {Tooltip} from 'antd';

import fanhui from '../images/返回 (1).png';
import touxiang from '../images/头像.png';
import erweima from '../images/二维码.png';
import xiaoren from '../images/小人.png';

const Item = List.Item;
const text = <span>你看我是不是很漂亮？<br/>٩(๑❛ᴗ❛๑)۶我也觉得人家<br/>很漂亮呢(＾▽＾)</span>;

export default class AboutMe extends Component {
    constructor(){
        super();
        this.state = {
            user:{},
            previewPic:'',
            sex:'', 
            name:'',
            info:'',
            nnname:'',
            city:''
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
        fetch("http://47.98.163.228:8086/users?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
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
            var pic = localStorage.getItem('newImg');
            var ssex = localStorage.getItem('newSex');
            var nname = localStorage.getItem('newName');
            var iinfo = localStorage.getItem('newInfo');
            var ccity = localStorage.getItem('newCity');
            if(nname!==null && nname!==''){
                console.log(nname)
                this.setState({
                    name:nname,
                })
            }
            if(iinfo !== null && iinfo!==''){
              console.log(iinfo)
              this.setState({
                  info:iinfo,
              })
            }
            if(ccity !== null && ccity!==''){
                console.log(ccity)
                this.setState({
                    city:ccity,
                })
            }
            if(pic !== null && pic!==''){
                console.log(pic)
                this.setState({
                    previewPic:pic,
                })
            }
            if(ssex !== null && ssex!==''){
                console.log(ssex)
                this.setState({
                    sex:ssex,
                })
            }


        })
    }
    //头像
    handleUpload(e) {
        console.log(e.target.files[0]);
        const reader = new FileReader();
        // 读取文件内容，结果用data:url的字符串形式表示
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(e) {
            console.log(e.target.result);  // 上传的图片的编码
            this.setState({
                previewPic: e.target.result
            });
            localStorage.setItem('newImg',e.target.result)
        }.bind(this);
        
    }
     
    render() {
        return (
           
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/gerentab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
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
                <Tooltip placement="right" title={text}>
                    <img src={xiaoren} alt='' style={{width:'30%',height:'40%',marginLeft:'10%',float:'left'}} onClick={() => {}}/>
                </Tooltip>     
            </div>
        );
    }
}
