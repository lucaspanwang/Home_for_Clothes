import React, { Component } from 'react';
import { NavBar, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { Comment, Avatar, Form, Button, List, Input,Row, Col } from 'antd';
import './community.css';
import fanhui from '../images/返回 (1).png';
import photo from '../images/lunbo02.jpg';

const data = [
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'}
]

export default class Office extends Component {
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/shequtab/111"}><img src={fanhui} style={{width:'30px'}} key="offfan"/></Link>
                ]}
                >官方消息</NavBar>
                <SearchBar placeholder="请输入你要查找的名字" maxLength={4} style={{backgroundColor:'#ccc'}}/>
                <div className="office" style={{border:"none"}}>
                    {
                        data.map((item)=>(
                        <div style={{paddingBottom:'4px',borderBottom:"1px solid #bbb"}}>
                            <div className="message">
                                <img src={item.photo}/>
                                <div>
                                    <p className="title">{item.title}</p>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                            <div style={{width:'100%',display:'flex',justifyContent:'space-between',fontSize:'12px',color:'#888'}}>
                                <span>发布于{item.time}</span>
                                <span>查看详情</span>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
