import React, { Component } from 'react';
import { NavBar,Popover } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { Consumer } from '../context';
import './community.css';

import fanhui from '../images/fanhui_1.png';
import pinglun from '../images/pinglun.png';
import dianzan from '../images/dianzan.png';
import yidianzan from '../images/dianzan_1.png';

const Item = Popover.Item;
const { TextArea } = Input;

export default class Review extends Component {
    constructor(){
      super();
      this.state = {
        visible: false,
        selected: '',
        user:{},
        toReview:{},
        cimg:[],
        review:[],
        submitting: false,
        value: '',
      }
    }
    componentDidMount(){
      var articleId=this.props.match.params.id.split("&")[0];
      var reviewId=this.props.match.params.id.split("&")[1];
      var userId=this.props.match.params.id.split("&")[2];
      fetch("http://47.98.163.228:3004/review?reviewId="+reviewId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
          }
          this.setState({
            toReview:res[0]
          })
      });
      fetch("http://47.98.163.228:3004/review?articleId="+articleId+'&toReview='+reviewId)
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
        fetch('http://47.98.163.228:3004/reviewAdd',{
          method: 'post', 
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true,
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({userId:this.state.user.userId,articleId:this.props.match.params.id.split("&")[0],reviewContent:this.state.value,reviewTime:date.toLocaleString(),toReview:this.state.toReview.reviewId})
        })
        .then(res=>{
          console.log(res);
          var comments = this.state.review;
          comments = [
            {
              userName : this.state.user.userName,
              userPic : this.state.user.userPic,
              userId : this.state.user.userId,
              articleId :this.props.match.params.id.split("&")[0],
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
    render() {
        return (
          <Consumer>
            {
              (data) => <div onLoad={(data)=>this.setState({userId:data})}>
              <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/shequarticle/"+this.props.match.params.id.split("&")[0]+'&'+this.props.match.params.id.split("&")[2]}><img src={fanhui} style={{width:'30px'}} key="revfan"/></Link>
                ]}
                >{this.state.review.length}条回复</NavBar>
                <div className="secReview">
                  <div className="left">
                      <img className='userImg' src={this.state.toReview.userPic} alt=""/>
                  </div>
                  <div className="right">
                      <span className='userName'>{this.state.toReview.userName}</span>
                      <p>{this.state.toReview.reviewContent}</p>
                  </div>
                  <div className="revState">
                    <span>发布于{this.state.toReview.reviewTime}</span>
                    {/* <div onClick={this.onAgree.bind(this,this.state.toReview.articleId)}>
                        <img src={this.state.toReview.like?`${yidianzan}`:`${dianzan}`} alt=''/>
                        <span>{this.state.toReview.agree || "点赞"}</span>
                    </div> */}
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
                  <Form.Item  className="reviewInput">
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
