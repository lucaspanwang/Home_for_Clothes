import React, { Component } from 'react';
import { NavBar,Popover,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Comment, Avatar, Form, Button, List, Input,Row, Col } from 'antd';
import Gongge from './Gongge';
import moment from 'moment';
import { Consumer } from '../context';
import './community.css';

import fanhui from '../images/返回 (1).png';
import dianzan from '../images/点赞.png';
import ArticleModule from './common/ArticleModule';

const Item = Popover.Item;
const { TextArea } = Input;

export default class Article extends Component {
    constructor(){
      super();
      this.state = {
        user:{},
        article:{},
        articleId:'',
        userId:'',
        review:[],
        value: '',
      }
    }
    componentDidMount(){
      this.setState({
        articleId:this.props.match.params.id.split("&")[0],
        userId:this.props.match.params.id.split("&")[1]
      });
      fetch("http://47.98.163.228:3004/review?articleId="+this.props.match.params.id.split("&")[0])
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
      fetch("http://47.98.163.228:3004/users?userId="+this.props.match.params.id.split("&")[1])
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
              <ArticleModule 
                articleId={this.props.match.params.id.split("&")[0]} 
                userId={this.props.match.params.id.split("&")[1]}
              />
              <Comment
                avatar={
                  <Avatar
                    src={this.state.user.userPic}
                    alt={this.state.user.userName}
                  />
                }
                content={
                  <Form.Item className="reviewInput">
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
                      actions={[<div>
                        <Link to={"/review/"+this.props.match.params.id}>
                          <div style={{width:'100%',height:'30px',margin:'5px 0',lineHeight:'30px',fontSize:'12px',borderRadius:'5px',backgroundColor:'#ddd'}}>共3条回复</div>
                        </Link>
                        <div style={{width:'100%',fontSize:'10px',color:'#888',display:'flex',justifyContent:'space-between'}}>
                          <span>发布于{item.reviewTime}</span>
                          <div><img style={{width:'18px',height:'18px',marginRight:'3px'}} src={dianzan} alt=''/><span>{this.state.article.agree || 0}</span></div>
                        </div>
                      </div>]}
                    />
                    
                  </li>
                )}
              />
            </div>
            }
          </Consumer>)
    }
}
