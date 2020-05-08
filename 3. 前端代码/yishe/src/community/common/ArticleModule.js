//文章模块，根据判断决定是显示在社区页的样式还是文章详情的样式
import React, { Component } from 'react';
import { Toast,Popover } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import Gongge from './Gongge';
import '../community.css';
import {standardTime} from './standardTime';

import xiala from '../../images/xiala.png';
import fenxiang from '../../images/fenxiang_1.png';
import shoucang from '../../images/shoucang.png';
import yishoucang from '../../images/shoucang_1.png';
import guanzhu from '../../images/guanzhu.png';
import yiguanzhu from '../../images/guanzhu_1.png';
import pinglun from '../../images/pinglun.png';
import dianzan from '../../images/dianzan.png';
import yidianzan from '../../images/dianzan_1.png';
import message from '../../images/message.png';

const { Paragraph } = Typography;
const Item = Popover.Item;

export default class ArticleModule extends Component {
    constructor(){
        super();
        this.state={
            user:{},
            article:{}
        }
    }
    componentDidMount(){
        fetch("http://47.98.163.228:3004/article?articleId="+this.props.articleId)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                for(var j=0;j<res[i].cimg.length;j++){
                    res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
                }
            }
            res[0].time = standardTime(res[0].time)
            this.setState({
                article:res[0],
            });
            fetch("http://47.98.163.228:3004/care?userId="+this.props.userId+"&careId="+this.state.article.userId)
            .then(res=>res.json())
            .then(res=>{
                let article=this.state.article;
                article.follow = Boolean(res.length);
                this.setState({
                    article:article
                })
            })
        });
        fetch("http://47.98.163.228:3004/collect?userId="+this.props.userId+"&articleId="+this.props.articleId)
        .then(res=>res.json())
        .then(res=>{
            let article=this.state.article;
            article.collect = Boolean(res.length);
            this.setState({
                article:article
            })
        })
        fetch("http://47.98.163.228:3004/agree?userId="+this.props.userId+"&articleId="+this.props.articleId)
        .then(res=>res.json())
        .then(res=>{
            let article=this.state.article;
            article.like = Boolean(res.length);
            this.setState({
                article:article
            })
        })
    }
    //下拉菜单
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    //收藏/取消收藏
    onCollect = (id) =>{
        let article = this.state.article;
        if(article.collect){
            fetch("http://47.98.163.228:3004/collectDelete?userId="+this.props.userId+"&articleId="+id)
            .then(res=>{
                article.collect = false;
                article.save = article.save-1;
                this.setState({
                    article:article
                })
            })
        }else{
            fetch("http://47.98.163.228:3004/collectAdd?userId="+this.props.userId+"&articleId="+id)
            .then(res=>{
                article.collect = true;
                article.save = article.save+1;
                this.setState({
                    article:article
                })
            })
        }
    }
    //关注/取消关注
    onCare = (id) =>{
        let article = this.state.article;
        if(article.follow){
            fetch("http://47.98.163.228:3004/careDelete?userId="+this.props.userId+"&careId="+id)
            .then(res=>{
                article.follow = false;
                this.setState({
                    article:article
                })
            })
        }else{
            fetch("http://47.98.163.228:3004/careAdd?userId="+this.props.userId+"&careId="+id)
            .then(res=>{
                article.follow = true;
                this.setState({
                    article:article
                })
            })
        }
    }
    //点赞/取消点赞
    onAgree = (id) =>{
        let article = this.state.article;
        if(article.like){
            fetch("http://47.98.163.228:3004/agreeDelete?userId="+this.props.userId+"&articleId="+id)
            .then(res=>{
                article.like = false;
                article.agree = article.agree-1;
                this.setState({
                    article:article
                })
            })
        }else{
            fetch("http://47.98.163.228:3004/agreeAdd?userId="+this.props.userId+"&articleId="+id)
            .then(res=>{
                article.like = true;
                article.agree = article.agree+1;
                this.setState({
                    article:article
                })
            })
        }
    }
    
    render() {
        return (
            <div className="article" key={this.state.article.articleId}>
                <div className='artUser'>
                    <Link to={'/others/'+this.state.article.userId+'&'+this.props.userId}>
                        <img className='userImg' src={this.state.article.userPic} alt=""/>
                        <span className='userName'>{this.state.article.userName}</span>
                    </Link>
                    {/* 是否是个人的发帖文章页 */}
                    {
                        this.props.operation == "delete"
                        ?(<button style={{float:"right",fontSize:"16px",color:"#fff",padding:"8px 15px",border:"2px solid #85c7fd",borderRadius:"6px",backgroundColor:"#97cdf9"}} onClick={()=>this.props.deleteItem(this.state.article.articleId)}>删除文章</button>)
                        :(<Popover mask
                            visible={this.state.visible}
                            overlay={[
                                (<Item key={2} value="关注" style={{padding:'10px 25px'}}>
                                    <div onClick={this.onCare.bind(this,this.state.article.userId)}>
                                        <img src={this.state.article.follow?`${yiguanzhu}`:`${guanzhu}`} alt='' style={{width:'25px'}}/>
                                        <span style={{padding:'0 20px',fontSize:'18px'}}>{this.state.article.follow?"已关注":"关注"}</span>
                                    </div>
                                </Item>),
                                (<Item key={1} value="私信" style={{padding:'10px 25px'}}>
                                    <div><img src={message} alt='' style={{width:'25px'}}/>
                                    <span style={{padding:'0 20px',fontSize:'18px'}}>私信</span></div>
                                </Item>),
                                (<Item key={1} value="分享" style={{padding:'10px 25px'}}>
                                    <div><img src={fenxiang} alt='' style={{width:'25px'}}/>
                                    <span style={{padding:'0 20px',fontSize:'18px'}}>分享</span></div>
                                </Item>)
                            ]}
                            onSelect={this.onSelect}
                        ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                        </Popover>)
                    }
                </div>
                {/* 判断是在社区首页显示，还是在文章详情页显示 */}
                {
                    this.props.place == "index"
                    ?(<div className="artDetail">
                        <Paragraph ellipsis={{rows:5}}>{this.state.article.content}</Paragraph>
                        <Link to={"/shequarticle/"+this.props.articleId+"&"+this.props.userId}>阅读全文>></Link>
                        <Gongge cimg={this.state.article.cimg}/>
                    </div>)
                    :(<div className="artDetail">
                        <p>{this.state.article.content}</p>
                        <Gongge cimg={this.state.article.cimg}/>
                        <span>发布于{this.state.article.time}</span>
                    </div>)
                }
                <ul className="artState">
                    {this.props.place=="index"?(<li><span>{this.state.article.time}</span></li>):""}
                    <li>
                        <img src={`${pinglun}`} alt=''/>
                        <span style={{color:"#444"}}>{this.state.article.review || "评论"}</span>
                    </li>
                    <li onClick={this.onCollect.bind(this,this.state.article.articleId)}>
                        <img src={this.state.article.collect?`${yishoucang}`:`${shoucang}`} alt=''/>
                        <span>{this.state.article.save || "收藏"}</span>
                    </li>
                    <li onClick={this.onAgree.bind(this,this.state.article.articleId)}>
                        <img src={this.state.article.like?`${yidianzan}`:`${dianzan}`} alt=''/>
                        <span>{this.state.article.agree || "点赞"}</span>
                    </li>
                </ul>
            </div>
        )
    }
}
