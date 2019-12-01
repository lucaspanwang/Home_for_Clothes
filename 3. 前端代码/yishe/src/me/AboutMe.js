import React, { Component } from 'react'
import { NavBar,List} from 'antd-mobile';
import {Tooltip} from 'antd';

import fanhui from '../images/返回 (1).png';
import touxiang from '../images/头像.png';
import erweima from '../images/二维码.png';
import xiaoren from '../images/小人.png';

const Item = List.Item;
const text = <span>你看我是不是很漂亮？<br/>٩(๑❛ᴗ❛๑)۶我也觉得人家<br/>很漂亮呢(＾▽＾)</span>;

export default class AboutMe extends Component {
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <a onClick={()=>{this.hrefChange('gerentab')}}><img src={fanhui} style={{width:'30px'}} key="fan"/></a>
                ]}
                >个人中心</NavBar>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>头像</span>
                       <img src={touxiang} alt='' style={{width:'12%',height:'12%',float:'right'}}/>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>性别</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>女</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>昵称</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>我是最美的啦啦啦</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>账号</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>12345678910</span>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>二维码</span>
                       <img src={erweima} alt='' style={{width:'12%',height:'12%',float:'right'}}/>
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                       <span style={{lineHeight:'100%',fontSize:'14px'}}>简介</span>
                       <span style={{lineHeight:'100%',float:'right',color:'#888'}}>我是全世界最漂亮的...</span>
                    </Item>
                </List>
                <Tooltip placement="right" title={text}>
                    <img src={xiaoren} alt='' style={{width:'30%',height:'40%',marginLeft:'10%',float:'left'}} onClick={() => {}}/>
                </Tooltip>     
            </div>
        );
    }
}
