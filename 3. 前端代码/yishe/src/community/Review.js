import React, { Component } from 'react';
import { NavBar,Popover,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Comment, Avatar, Form, Button, List, Input,Row, Col } from 'antd';
import Gongge from './Gongge';
import moment from 'moment';
import { Consumer } from '../context';
import './community.css';

import fanhui from '../images/返回 (1).png';
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

const Item = Popover.Item;
const { TextArea } = Input;

export default class Review extends Component {
    constructor(){
      super();
      this.state = {
        visible: false,
        selected: '',
        user:{},
        article:{},
        cimg:[],
        review:[],
        submitting: false,
        value: '',
      }
    }
    componentDidMount(){
      var articleId=this.props.match.params.id.split("&")[0];
      var userId=this.props.match.params.id.split("&")[1];
      fetch("http://47.98.163.228:3004/article?articleId="+articleId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
            for(var j=0;j<res[i].cimg.length;j++){
                res[i].cimg[j] = "http://47.98.163.228:3004"+res[i].cimg[j];
            }
          }
          res[0].time = this.standardTime(res[0].time)
          this.setState({
            article:res[0],
          })
      });
      fetch("http://47.98.163.228:3004/collect?userId="+userId)
      .then(res=>res.json())
      .then(res=>{
          var article=this.state.article;
          article.collect = false;
          for(var i=0;i<res.length;i++){
              if(res[i].articleId === article.articleId){
                article.collect = true;
              }
          }
          this.setState({
              article:article
          })
      })
      fetch("http://47.98.163.228:3004/agree?userId="+userId)
      .then(res=>res.json())
      .then(res=>{
          var article=this.state.article;
          article.like = false;
          for(var i=0;i<res.length;i++){
            if(article.articleId == res[i].articleId){
              article.like = true;
            }
          }
          this.setState({
              article:article
          })
      })
      fetch("http://47.98.163.228:3004/care?userId="+userId)
      .then(res=>res.json())
      .then(res=>{
        var article=this.state.article;
        article.follow = false;
        for(var i=0;i<res.length;i++){
          if(article.userId == res[i].careId){
            article.follow = true;
          }
        }
        this.setState({
            article:article
        })
      })
      fetch("http://47.98.163.228:3004/review?articleId="+articleId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
          }
          this.setState({
            review:res
          })
      });
      fetch("http://47.98.163.228:3004/users?userId="+userId)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
                console.log(res[i].userPic);
            }
            this.setState({
                user:res[0]
            })
        });
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
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
    handleSubmit = () => {
      if (!this.state.value) {
        return;
      }
      this.setState({
        submitting: true,
      });
      setTimeout(() => {
        var date = new Date();
        fetch("http://47.98.163.228:3004/reviewAdd?userId="+this.state.user.userId+"&articleId="+this.state.article.articleId+"&reviewContent="+this.state.value+"&reviewTime="+date.toLocaleString())
        .then(res=>res.json())
        .then(res=>{
          var comments = this.state.review;
          comments = [
            {
              userName : this.state.user.userName,
              userPic : this.state.user.userPic,
              userId : this.state.user.userId,
              articleId :this.state.article.articleId,
              reviewContent : this.state.value,
              reviewTime : date.toLocaleString()
            },
            ...comments
          ];
          this.setState({
            submitting: false,
            value: '',
            review:comments
          });
        });
      }, 1000);
    };
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };
    //收藏/取消收藏
    onCollect = (id,event) =>{
      var article=this.state.article;
      if(article.collect === false){
          fetch("http://47.98.163.228:3004/collectAdd?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              article.collect = true;
              article.save += 1;
              this.setState({
                  article:article
              })
          })
      }else{
          fetch("http://47.98.163.228:3004/collectDelete?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              article.collect = false;
              article.save -= 1;
              this.setState({
                  article:article
              })
          })
      }
    }
    //关注/取消关注
    onCare = (id,event) =>{
      var article=this.state.article;
      if(article.follow === false){
          fetch("http://47.98.163.228:3004/careAdd?userId="+this.props.match.params.id.split("&")[1]+"&careId="+id)
          .then(res=>res.json())
          .then(res=>{
            article.follow = true;
            this.setState({
              article:article 
            })
          })
      }else{
          fetch("http://47.98.163.228:3004/careDelete?userId="+this.props.match.params.id.split("&")[1]+"&careId="+id)
          .then(res=>res.json())
          .then(res=>{
            article.follow = false;
            this.setState({
              article:article
            })
          })
      }
    }
    //点赞/取消点赞
    onAgree = (id,event) =>{
      var article=this.state.article;
      if(article.like === false){
          fetch("http://47.98.163.228:3004/agreeAdd?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              article.like = true;
              article.agree += 1;
              this.setState({
                  article:article
              })
          })
        }else{
            fetch("http://47.98.163.228:3004/agreeDelete?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
            .then(res=>res.json())
            .then(res=>{
              article.like = false;
              article.agree -= 1;
              this.setState({
                  article:article
              })
            })
        }
    }
    render() {
        return (
          <Consumer>
            {
              (data) => <div onLoad={(data)=>this.setState({userId:data})}>
              <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/shequarticle/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="revfan"/></Link>
                ]}
                >{this.state.review.length}条回复</NavBar>
                <div className="secReview">
                  <div className="left">
                      <img className='userImg' src={this.state.article.userPic} alt=""/>
                  </div>
                  <div className="right">
                      <span className='userName'>{this.state.article.userName}</span>
                      <p>{this.state.article.content}</p>
                  </div>
                  <div className="revState">
                    <span>发布于{this.state.article.time}</span>
                    <div onClick={this.onAgree.bind(this,this.state.article.articleId)}>
                        <img src={this.state.article.like?`${yidianzan}`:`${dianzan}`} alt=''/>
                        <span>{this.state.article.agree || "点赞"}</span>
                    </div>
                  </div>
              </div>
              <Comment
                avatar={
                  <Avatar
                    src={this.state.user.userPic}
                    alt={this.state.user.userName}
                  />
                }
                content={
                  <Form.Item>
                    <TextArea rows={1} onChange={this.handleChange} value={this.state.value} />
                    <Button htmlType="submit" loading={this.state.submitting} onClick={this.handleSubmit} type="primary">回复</Button>
                  </Form.Item>
                }
              />
              <List
                className="comment-list"
                style={{padding:"0 15px"}}
                header={`${this.state.review.length} 评论`}
                dataSource={this.state.review}
                renderItem={item => (
                  <li>
                    <Comment
                      author={item.userName}
                      avatar={item.userPic}
                      content={item.reviewContent}
                      datetime={item.reviewTime}
                    />
                  </li>
                )}
              />
            </div>
            }
          </Consumer>)
    }
}
