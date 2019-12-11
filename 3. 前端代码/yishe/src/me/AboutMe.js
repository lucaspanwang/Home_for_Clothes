import React, { Component } from 'react'
import { NavBar,List} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import {Tooltip} from 'antd';

import fanhui from '../images/返回 (1).png';
import xiaoren from '../images/小人.png';

const Item = List.Item;
const text = <span>你看我是不是很漂亮？<br/>٩(๑❛ᴗ❛๑)۶我也觉得人家<br/>很漂亮呢(＾▽＾)</span>;

export default class AboutMe extends Component {
    constructor(){
        super();
        this.state = {
            user:{}
        }
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
          this.setState({
              user:res[0]
          })
          console.log(this.state.user);
      });
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
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>头像</span>
                       <img src={this.state.user.userPic} alt='' style={{width:'12%',height:'12%',float:'right'}}/>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>性别</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userSex}</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>昵称</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userName}</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>账号</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userPho}</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>城市</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userCity}</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>简介</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>{this.state.user.userIntro}</span>
                    </Item>
                </List>
                <Tooltip placement="right" title={text}>
                    <img src={xiaoren} alt='' style={{width:'30%',height:'40%',marginLeft:'10%',float:'left'}} onClick={() => {}}/>
                </Tooltip>     
            </div>
        );
    }
}
