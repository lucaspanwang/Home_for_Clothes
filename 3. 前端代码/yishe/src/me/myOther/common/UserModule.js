import React, { Component } from 'react';
import { Typography } from 'antd';

import female from '../../../images/female.png';
import male from '../../../images/male.png';

const { Paragraph } = Typography;

export default class UserModule extends Component {
    constructor(){
        super();
        this.state={
            user:{}
        }
    }
    componentDidMount(){
        console.log(this.props.userId);
        fetch('http://47.98.163.228:3004/users?userId='+this.props.userId)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
            }
            this.setState({
                user:res[0]
            })
        })
    }
    render() {
        return (
            <div style={{margin:'8px 0',padding:'10px',overflow:'hidden',border:'1px solid #ddd',borderRadius:'6px',boxShadow:'6px 6px 5px rgba(0,0,0,.1)'}}>
                <div style={{float:'left',marginRight:'15px',position:'relative'}}>
                    <img src={this.state.user.userPic} style={{width:'50px',height:'50px',borderRadius:'50%'}} />
                    <img src={this.state.user.userSex=='男'?male:female} style={{position:'absolute',right:'0',bottom:'0',width:'18px',borderRadius:'50%'}} />
                </div>
                <div style={{width:'calc(100% - 65px)',height:'50px',float:'left'}}>
                    <p style={{font:'bold 18px YouYuan',margin:'0',lineHeight:'25px'}}>{this.state.user.userName}</p>
                    <Paragraph ellipsis={{rows:1}} style={{color:'#888',margin:'0',lineHeight:'25px'}}>简介：{this.state.user.userIntro}</Paragraph>
                </div>
            </div>
        )
    }
}
