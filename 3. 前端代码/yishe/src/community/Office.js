import React, { Component } from 'react';
import { NavBar, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './community.css';
import fanhui from '../images/返回 (1).png';
import photo from '../images/lunbo02.jpg';

const data = [
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
    {id:'Off999999',photo:photo,title:'衣舍联名推出智能衣柜',content:'衣舍联名推出智能扫描仪和智能衣柜，帮助用户更加智能的存储衣物',time:'2020/04/14'},
]

export default class Office extends Component {
    constructor(){
        super();
        this.state = {
            office:[],
        }
    }
    componentDidMount(){
        // var userId=this.props.match.params.id;
        fetch("http://47.98.163.228:3004/office")
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                res[i].offImg = "http://47.98.163.228:3004"+res[i].offImg;
                res[i].offTime = this.standardTime(res[i].offTime)
            }
            this.setState({
                office:res,
            })
        });
    }
    standardTime = (timestamp)=>{
        var mius=Math.round(new Date())-Math.round(new Date(timestamp));
        if(mius<(1000*60)){
            return Math.floor(mius/1000)+'秒前';
        }else if(mius<(1000*60*60)){
            return Math.floor(mius/(1000*60))+'分钟前';
        }else if(mius<(1000*60*60*24)){
            return Math.floor(mius/(1000*60*60))+'小时前';
        }else if(mius<(1000*60*60*24*30)){
            return Math.floor(mius/(1000*60*60*24))+'天前';
        }else if(mius<(1000*60*60*24*30*12)){
            return Math.floor(mius/(1000*60*60*24*30))+'个月前';
        }else{
            return Math.floor(mius/(1000*60*60*24*30*12))+'年前';
        }
      }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/shequtab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="offfan"/></Link>
                ]}
                >官方消息</NavBar>
                <Link to={"/search/"+this.props.id}>
                    <SearchBar placeholder="搜索" style={{backgroundColor:'#ccc'}} disabled/>
                </Link>
                <div className="office" style={{border:"none"}}>
                    {
                        this.state.office.map((item)=>(
                        <div style={{paddingBottom:'4px',borderBottom:"1px solid #bbb"}}>
                            <div className="message">
                                <img src={item.offImg}/>
                                <div>
                                    <p className="title">{item.offTitle}</p>
                                    <p>{item.offContent}</p>
                                </div>
                            </div>
                            <div style={{width:'100%',display:'flex',justifyContent:'space-between',fontSize:'12px',color:'#888'}}>
                                <span>发布于{item.offTime}</span>
                                <Link to={"/officearticle/"+item.offId+"&"+this.props.match.params.id}><span>查看详情</span></Link>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
