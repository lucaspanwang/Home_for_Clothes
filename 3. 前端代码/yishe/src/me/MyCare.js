import React, { Component } from 'react'
import { Collapse,List } from 'antd';
import {Link} from 'react-router-dom';
import { NavBar,Grid } from 'antd-mobile';

import Back from '../images/返回 (1).png';
import yonghu from '../images/yonghu.png';
import chengshi from '../images/chengshi.png';
import xingbie from '../images/xingbie.png';
import jianjie from '../images/jianjie.png';
import shoucang from '../images/收藏.png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';

const Item = List.Item;
const { Panel } = Collapse;

const data = [
    {
      photo:yonghu,
      title:'用户'
    },
    {
      photo:xingbie,
      title:'性别'
    },
    {
      photo:chengshi,
      title:'城市'
    },
    {
      photo:jianjie,
      title:'简介'
    },
  ];
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class MyCare extends Component {
    constructor(){
        super();
        this.state={
            care:[],
            users:[]
        }
    }
    componentWillMount(){
        fetch("http://47.98.163.228:8086/care?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            var result = [];
            for(var k=0;k<res.length;k++){
                fetch("http://47.98.163.228:8086/users?userId="+res[k].careId)
                .then(value=>value.json())
                .then(value=>{
                    for(var i=0;i<value.length;i++){
                        var j = value[i].userPic.indexOf('/');
                        value[i].userPic = "http://47.98.163.228:8086"+value[i].userPic.substr(j);
                    }
                    result.push(...value);
                    this.setState({
                        care:result
                    })
                });
            }
        })
    }
    myCareArticle = (id,event)=>{
        fetch("http://47.98.163.228:8086/article?userId="+id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
                for(var j=0;j<res[i].cimg.length;j++){
                    res[i].cimg[j] = "http://47.98.163.228:8086"+res[i].cimg[j];
                }
            }
            this.setState({
                users:res
            })
            this.forceUpdate();
        });
    }
    //修改时间
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
            <div>
                <NavBar
                    leftContent={
                        <Link to={"/gerentab/"+this.props.match.params.id}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>关注</NavBar>
                <Collapse bordered={true} accordion>
                {
                    this.state.care.map((item)=>(
                        <Panel key={item.userId} header={
                        <div style={{height:'60px'}}>
                            <div style={{float:'left',marginRight:'15px'}}><img src={item.userPic} alt='' style={{width:'50px',height:'50px',borderRadius:'10px'}}/></div>
                            <div style={{float:'left',fontSize:'18px'}}>
                                <p>{item.userName}</p>
                                <p style={{color:'#888',fontSize:'16px',marginBottom:'0'}}>{"简介: "+item.userIntro}</p>
                            </div>
                        </div>
                        }>
                            <ul className='careUser'>
                                <li><img src={yonghu}/>{"用户："+item.userName+"（"+item.userPho+")"}</li>
                                <li><img src={xingbie}/>{"性别："+item.userSex}</li>
                                <li><img src={chengshi}/>{"城市："+item.userCity}</li>
                                <li onClick={this.myCareArticle.bind(this,item.userId)}><Collapse bordered={false} style={{padding:"0",margin:"0"}}>
                                <Panel header={<div><img src={jianjie} style={{width:'25px',marginRight:"15px"}}/>发帖</div>} key="1">
                                    {this.state.users.map((it)=>(<div className="article" key={it.articleId}>
                                        <div className='artUser'>
                                            <img className='userImg' src={it.userPic} alt=""/>
                                            <span className='userName'>{it.userName}</span>
                                        </div>
                                        <div className="artDetail">
                                            {it.content}
                                            <Grid square
                                            data={it.cimg}
                                            columnNum="3"
                                            renderItem={dataItem => (
                                                <img src={dataItem} style={{ width:'100%'}} alt="" />
                                            )}
                                            />
                                        </div>
                                        <ul className="artState">
                                            <li><span>{this.standardTime(it.time)}</span></li>
                                            <li><Link to={"/shequarticle/"+it.articleId+"&"+this.props.match.params.id}><img src={`${pinglun}`} alt=''/><span style={{color:"#444"}}>{item.review || "评论"}</span></Link></li>
                                            <li><img src={shoucang} alt=''/><span>{it.save || "收藏"}</span></li>
                                            <li><img src={dianzan} alt=''/><span>{it.agree || "点赞"}</span></li>
                                        </ul>
                                    </div>))}
                                </Panel>
                                </Collapse></li>
                            </ul>
                        </Panel>
                    ))
                }
                </Collapse>
            </div>
        )
    }
}
