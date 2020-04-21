import React, { Component } from 'react';
import { Popover, NavBar, Drawer, List, SearchBar } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Typography,Menu, Dropdown, Icon } from 'antd';
import './me.css';
import Gongge from '../community/Gongge';

import tianjia from '../images/添加.png';
import fanhui from '../images/返回 (1).png';
import shoucang from '../images/收藏.png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';

const { Paragraph } = Typography;
const Item = Popover.Item;

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[],
            open: false,
        }
    }   
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                for(var j=0;j<res[i].cimg.length;j++){
                    res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                }
            }
            this.setState({
                users:res
            })
        });
        this.forceUpdate();
    }
    deleteArticle=(id)=>{
        console.log(id);
        fetch("http://47.98.163.228:3004/articleDelete?articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              fetch("http://47.98.163.228:3004/article?userId="+this.props.match.params.id)
                .then(res=>res.json())
                .then(res=>{
                    for(var i=0;i<res.length;i++){
                        var j = res[i].userPic.indexOf('/');
                        res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                        for(var j=0;j<res[i].cimg.length;j++){
                            res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                        }
                    }
                    this.setState({
                        users:res
                    })
            })
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
    // onOpenChange = (...args) => {
    //     console.log(args);
    //     this.setState({ open: !this.state.open });
    // }
    render() {
        // const sidebar = (<List>
        //     {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        //         if (index === 0) {
        //         return (<List.Item key={index}
        //             thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        //             multipleLine
        //         >Category</List.Item>);
        //         }
        //         return (<List.Item key={index}
        //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        //         >Category{index}</List.Item>);
        //     })}
        //     </List>);
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/gerentab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={<Link to={"/articleadd/"+this.props.match.params.id}><img src={tianjia} style={{width:"20px"}}/></Link>}
                >发帖</NavBar>
                {/* <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar> */}
                {/* <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                > */}
                <SearchBar placeholder="请输入你要查找的名字" maxLength={4} style={{backgroundColor:'#ccc'}}/>
                {
                    this.state.users.map((item)=>(<div className="article" key={item.articleId}>
                        <div className='artUser'>
                            <img className='userImg' src={item.userPic} alt=""/>
                            <span className='userName'>{item.userName}</span>
                            <button style={{float:"right",fontSize:"16px",color:"#fff",padding:"8px 15px",border:"2px solid #85c7fd",borderRadius:"6px",backgroundColor:"#97cdf9"}} onClick={()=>this.deleteArticle(item.articleId)}>删除文章</button>
                        </div>
                        <div className="artDetail">
                            {item.content}
                            <Gongge cimg={item.cimg}/>
                        </div>
                        <ul className="artState">
                            <li><span>{this.standardTime(item.time)}</span></li>
                            <li><Link to={"/shequarticle/"+item.articleId+"&"+this.props.match.params.id}><img src={`${pinglun}`} alt=''/><span style={{color:"#444"}}>{item.review || "评论"}</span></Link></li>
                            <li><img src={shoucang} alt=''/><span>{item.save || "收藏"}</span></li>
                            <li><img src={dianzan} alt=''/><span>{item.agree || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
                {/* </Drawer> */}
            </div>
        );
    }
}