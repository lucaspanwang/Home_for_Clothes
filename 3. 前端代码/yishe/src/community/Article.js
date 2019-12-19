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

export default class Article extends Component {
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
      fetch("http://47.98.163.228:8086/article?articleId="+articleId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
            for(var j=0;j<res[i].cimg.length;j++){
                res[i].cimg[j] = "http://47.98.163.228:8086"+res[i].cimg[j];
            }
          }
          // var arr = [];
          // for(i in this.state.article.cimg){
          //   arr[i] = this.state.article.cimg[i].toString();
          //   // arr.push(this.state.article.cimg[i]);
          //   console.log(this.state.article.cimg[i].toString())
          // }
          res[0].time = this.standardTime(res[0].time)
          this.setState({
            article:res[0],
            // cimg:arr
          })
          // console.log(this.state.cimg);
      });
      fetch("http://47.98.163.228:8086/collect?userId="+userId)
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
      fetch("http://47.98.163.228:8086/agree?userId="+userId)
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
      fetch("http://47.98.163.228:8086/care?userId="+userId)
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
      fetch("http://47.98.163.228:8086/review?articleId="+articleId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
          }
          this.setState({
            review:res
          })
          // console.log(this.state.review);
      });
      fetch("http://47.98.163.228:8086/users?userId="+userId)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
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
        fetch("http://47.98.163.228:8086/reviewAdd?userId="+this.state.user.userId+"&articleId="+this.state.article.articleId+"&reviewContent="+this.state.value+"&reviewTime="+date.toLocaleString())
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
          fetch("http://47.98.163.228:8086/collectAdd?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              article.collect = true;
              article.save += 1;
              this.setState({
                  article:article
              })
          })
      }else{
          fetch("http://47.98.163.228:8086/collectDelete?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
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
          fetch("http://47.98.163.228:8086/careAdd?userId="+this.props.match.params.id.split("&")[1]+"&careId="+id)
          .then(res=>res.json())
          .then(res=>{
            article.follow = true;
            this.setState({
              article:article 
            })
          })
      }else{
          fetch("http://47.98.163.228:8086/careDelete?userId="+this.props.match.params.id.split("&")[1]+"&careId="+id)
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
          fetch("http://47.98.163.228:8086/agreeAdd?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
          .then(res=>res.json())
          .then(res=>{
              article.like = true;
              article.agree += 1;
              this.setState({
                  article:article
              })
          })
        }else{
            fetch("http://47.98.163.228:8086/agreeDelete?userId="+this.props.match.params.id.split("&")[1]+"&articleId="+id)
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
                  <Link to={"/shequtab/"+this.props.match.params.id.split("&")[1]}><img src={fanhui} style={{width:'30px'}} key="artfan"/></Link>
                ]}
                >阅读全文</NavBar>
              <div className="article">
                  <div className='artUser'>
                      <img className='userImg' src={this.state.article.userPic} alt=""/>
                      <span className='userName'>{this.state.article.userName}</span>
                      <Popover mask
                        visible={this.state.visible}
                        overlay={[
                            (<Item key={1} value="分享" style={{padding:'10px 25px'}}>
                                <div><img src={fenxiang} alt='' style={{width:'25px'}}/>
                                <span style={{padding:'0 20px',fontSize:'18px'}}>分享</span></div>
                            </Item>),
                            (<Item key={2} value="关注" style={{padding:'10px 25px'}}>
                                <div onClick={this.onCare.bind(this,this.state.article.userId)}>
                                    <img src={this.state.article.follow?`${yiguanzhu}`:`${guanzhu}`} alt='' style={{width:'25px'}}/>
                                    <span style={{padding:'0 20px',fontSize:'18px'}}>{this.state.article.follow?"已关注":"关注"}</span>
                                </div>
                            </Item>)
                        ]}
                        onSelect={this.onSelect}
                    ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                    </Popover>
                  </div>
                  <div className="artDetail">
                    <p>{this.state.article.content}</p>
                    <Gongge id={this.state.article.cimg}/>
                    {/* <Gongge id={this.props.match.params.id.split("&")[0]}/> */}
                      {/* 
                      <Grid square
                      data={this.state.article.cimg}
                      columnNum="3"
                      renderItem={dataItem => (
                          <img src={dataItem} onClick={()=>{window.location.href=dataItem}} style={{ width:'100%',height:'100%',objectFit:'cover'}} alt="" />
                      )}
                      /> */}
                      <span>发布于{this.state.article.time}</span>
                  </div>
                  <ul className="artState">
                    <li><img src={`${pinglun}`}/><span>评论</span></li>
                    <li onClick={this.onCollect.bind(this,this.state.article.articleId)}><img src={this.state.article.collect?`${yishoucang}`:`${shoucang}`} alt=''/><span>{this.state.article.save || "收藏"}</span></li>
                    <li onClick={this.onAgree.bind(this,this.state.article.articleId)}><img src={this.state.article.like?`${yidianzan}`:`${dianzan}`} alt=''/><span>{this.state.article.agree || "点赞"}</span></li>
                  </ul>
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
