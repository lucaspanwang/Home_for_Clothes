import React, { Component } from 'react';
import { Popover, NavBar, WingBlank,WhiteSpace,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Typography,Menu, Dropdown, Icon,Row, Col } from 'antd';
import './community.css';

import tianjia from '../images/添加.png';
import xiala from '../images/下拉.png';
import fenxiang from '../images/分享(1).png';
import shoucang from '../images/收藏.png';
import yishoucang from '../images/收藏(1).png';
import pingbi from '../images/屏蔽.png';
import guanzhu from '../images/关注.png';
import yiguanzhu from '../images/关注(1).png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';
import yidianzan from '../images/点赞(1).png';
import Gongge from './Gongge';

const { Paragraph } = Typography;
const Item = Popover.Item;

export default class Community extends Component {
    constructor(){
        super();
        this.state = {
            visible: false,
            selected: '',
            users:[],
        }
    }    
    componentDidMount(){
        fetch("http://47.98.163.228:8086/article")
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
        });
        fetch("http://47.98.163.228:8086/collect?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            var users=this.state.users;
            for(var j=0;j<users.length;j++){
                users[j].collect = false;
                for(var i=0;i<res.length;i++){
                    if(users[j].articleId == res[i].articleId){
                        users[j].collect = true;
                    }
                }
            }
            // for(var j=0;j<users.length;j++){
            //     console.log("文章"+users[j].articleId+"的收藏"+users[j].collect);
            // }
            this.setState({
                users:users
            })
        })
        fetch("http://47.98.163.228:8086/agree?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            var users=this.state.users;
            for(var j=0;j<users.length;j++){
                users[j].like = false;
                for(var i=0;i<res.length;i++){
                    if(users[j].articleId == res[i].articleId){
                        users[j].like = true;
                    }
                }
            }
            // for(var j=0;j<users.length;j++){
            //     console.log("文章"+users[j].articleId+"的点赞"+users[j].like);
            // }
            this.setState({
                users:users
            })
        })
        fetch("http://47.98.163.228:8086/care?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            var users=this.state.users;
            for(var j=0;j<users.length;j++){
                users[j].follow = false;
                for(var i=0;i<res.length;i++){
                    if(users[j].userId == res[i].careId){
                        users[j].follow = true;
                    }
                }
            }
            // for(var j=0;j<users.length;j++){
            //     console.log(users[j].follow);
            // }
            this.setState({
                users:users
            })
        })
        this.forceUpdate();
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
    //下拉菜单
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    //收藏/取消收藏
    onCollect = (id,event) =>{
        var users = this.state.users;
        if(users.find(it => it.articleId === id).collect === false){
            fetch("http://47.98.163.228:8086/collectAdd?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).collect = true;
                users.find(it => it.articleId === id).save += 1;
                this.setState({
                    users:users
                })
            })
        }else{
            fetch("http://47.98.163.228:8086/collectDelete?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).collect = false;
                users.find(it => it.articleId === id).save -= 1;
                this.setState({
                    users:users
                })
            })
        }
    }
    //关注/取消关注
    onCare = (id,event) =>{
        var users = this.state.users;
        if(users.find(it => it.userId === id).follow === false){
            fetch("http://47.98.163.228:8086/careAdd?userId="+this.props.id+"&careId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.userId === id).follow = true;
                this.setState({
                    users:users
                })
            })
        }else{
            fetch("http://47.98.163.228:8086/careDelete?userId="+this.props.id+"&careId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.userId === id).follow = false;
                this.setState({
                    users:users
                })
            })
        }
    }
    //点赞/取消点赞
    onAgree = (id,event) =>{
        var users = this.state.users;
        if(users.find(it => it.articleId === id).like === false){
            fetch("http://47.98.163.228:8086/agreeAdd?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).like = true;
                users.find(it => it.articleId === id).agree += 1;
                this.setState({
                    users:users
                })
            })
        }else{
            fetch("http://47.98.163.228:8086/agreeDelete?userId="+this.props.id+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
                users.find(it => it.articleId === id).like = false;
                users.find(it => it.articleId === id).agree -= 1;
                this.setState({
                    users:users
                })
            })
        }
    }
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                rightContent={<Link to={"/articleadd/"+this.props.id}><img src={tianjia} style={{width:"20px"}}/></Link>}
                >社区</NavBar>
                <div style={{borderBottom:'5px dotted #bbb'}}>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <span style={{fontSize:'16px'}}>官方消息</span>
                        <div className="official">温馨提示：近日北京市寒潮即将抵达，温度降低，大家要做好保暖措施。</div>
                    </WingBlank>
                    <WhiteSpace size="lg" />
                </div>
                {
                    this.state.users.map((item)=>(<div className="article" key={item.articleId}>
                        <div className='artUser'>
                            <img className='userImg' src={item.userPic} alt=""/>
                            <span className='userName'>{item.userName}</span>
                            <Popover mask
                                visible={this.state.visible}
                                overlay={[
                                    (<Item key={1} value="分享" style={{padding:'10px 25px'}}>
                                        <div><img src={fenxiang} alt='' style={{width:'25px'}}/>
                                        <span style={{padding:'0 20px',fontSize:'18px'}}>分享</span></div>
                                    </Item>),
                                    (<Item key={2} value="关注" style={{padding:'10px 25px'}}>
                                        <div onClick={this.onCare.bind(this,item.userId)}>
                                            <img src={item.follow?`${yiguanzhu}`:`${guanzhu}`} alt='' style={{width:'25px'}}/>
                                            <span style={{padding:'0 20px',fontSize:'18px'}}>{item.follow?"已关注":"关注"}</span>
                                        </div>
                                    </Item>)
                                ]}
                                onSelect={this.onSelect}
                            ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                            </Popover>
                        </div>
                        <div className="artDetail">
                            <Paragraph ellipsis={{rows:5}}>{item.content}</Paragraph>
                            <Link to={"/shequarticle/"+item.articleId+"&"+this.props.id}>阅读全文>></Link>
                            <Gongge cimg={item.cimg}/>
                            {/* <Grid square="false"
                            data={item.cimg}
                            columnNum="1"
                            renderItem={dataItem => (
                                <img src={dataItem} onClick={()=>{window.location.href=dataItem}} style={{ width:'100%',height:'100%',objectFit:'cover'}} alt="" />
                            )} 
                            />*/}
                        </div>
                        <ul className="artState">
                            <li><span>{this.standardTime(item.time)}</span></li>
                            <li><Link to={"/shequarticle/"+item.articleId+"&"+this.props.id}><img src={`${pinglun}`} alt=''/><span style={{color:"#444"}}>{item.review || "评论"}</span></Link></li>
                            <li onClick={this.onCollect.bind(this,item.articleId)}><img src={item.collect?`${yishoucang}`:`${shoucang}`} alt=''/><span>{item.save || "收藏"}</span></li>
                            <li onClick={this.onAgree.bind(this,item.articleId)}><img src={item.like?`${yidianzan}`:`${dianzan}`} alt=''/><span>{item.agree || "点赞"}</span></li>
                        </ul>
                    </div>))
                }
            </div>
        );
    }
}