import React, { Component } from 'react';
import { NavBar,Popover,Grid } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { Consumer } from '../context';
import './community.css';

import fanhui from '../images/返回 (1).png';
import xiala from '../images/下拉.png';
import fenxiang from '../images/分享(1).png';
import shoucang from '../images/收藏.png';
import pingbi from '../images/屏蔽.png';
import guanzhu from '../images/关注.png';
import pinglun from '../images/评论.png';
import dianzan from '../images/点赞.png';

const Item = Popover.Item;
const menu = [
    {key:'1',value:'分享',image:`${fenxiang}`},
    {key:'2',value:'关注',image:`${guanzhu}`},
    {key:'3',value:'收藏',image:`${shoucang}`},
    {key:'4',value:'屏蔽',image:`${pingbi}`}
];
const { TextArea } = Input;
export default class Article extends Component {
    constructor(){
      super();
      this.state = {
        visible: false,
        selected: '',
        user:{},
        article:{},
        review:[],
        submitting: false,
        value: '',
      }
    }
    componentDidMount(){
      var articleId=this.props.match.params.id.split("&")[0];
      var userId=this.props.match.params.id.split("&")[1];
      // console.log(this.props.match.params.id);
      fetch("http://47.98.163.228:8086/article?articleId="+articleId)
      .then(res=>res.json())
      .then(res=>{
          for(var i=0;i<res.length;i++){
            // console.log(res[i].cimg.length);
            var j = res[i].userPic.indexOf('/');
            res[i].userPic = "http://47.98.163.228:8086"+res[i].userPic.substr(j);
            for(var j=0;j<res[i].cimg.length;j++){
                res[i].cimg[j] = "http://47.98.163.228:8086"+res[i].cimg[j];
                console.log(res[i].cimg[j]);
            }
          }
          res[0].time = this.standardTime(res[0].time)
          this.setState({
            article:res[0]
          })
          // console.log(this.state.article);
      });
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
            // console.log(this.state.user);
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
    standardTime = (time) => {
      var date = new Date();
      var nowDate = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
      var myDate = time.split(/[/: ]/);
      var timeDate = [];
      var str = ['年前','月前','天前','小时前','分钟前','秒前']
      for(var i=0;i<6;i++){
        timeDate[i] = nowDate[i] - Number(myDate[i]);
      }
      for(var j=0;j<5;j++){
        if(timeDate[j] > 1){
          return timeDate[j]+str[j];
        }else if(timeDate[j] === 1){
          if(timeDate[j+1] >= 0){
            return timeDate[j]+str[j];
          }else{
            if(j === 0){
              timeDate[j+1] = timeDate[j+1]+12;
            }else if(j === 1){
              timeDate[j+1] = timeDate[j+1]+30;
            }else if(j === 2){
              timeDate[j+1] = timeDate[j+1]+24;
            }else{
              timeDate[j+1] = timeDate[j+1]+60;
            }
            return timeDate[j+1]+str[j+1];
          }
        }
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
    render() {
        return (
          <Consumer>
            {
              (data) => <div onLoad={(data)=>this.setState({userId:data})}>
              <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                  <Link to={"/shequtab/"+this.props.match.params.id.split("&")[1]}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                >阅读全文</NavBar>
              <div className="article">
                  <div className='artUser'>
                      <img className='userImg' src={this.state.article.userPic} alt=""/>
                      <span className='userName'>{this.state.article.userName}</span>
                      <Popover mask
                          visible={this.state.visible}
                          overlay={[menu.map(it => (
                              (<Item key={it.key} value={it.value} style={{padding:'10px 25px'}}>
                                  <img src={it.image} alt='' style={{width:'25px'}}/>
                                  <span style={{padding:'0 20px',fontSize:'18px'}}>{it.value}</span>
                              </Item>)
                          ))]}
                          onSelect={this.onSelect}
                      ><img src={`${xiala}`} alt="" style={{margin:'10px',width:'20px',float:'right'}}/>
                      </Popover>
                  </div>
                  <div className="artDetail">
                      <p>{this.state.article.content}</p>
                      <Grid square
                      data={this.state.article.cimg}
                      columnNum="3"
                      renderItem={dataItem => (
                          <img src={dataItem} style={{ width:'100%'}} alt="" />
                      )}
                      />
                      <span>发布于{this.state.article.time}</span>
                  </div>
                  <ul className="artState">
                    <li><img src={`${pinglun}`}/><span>评论</span></li>
                    <li><img src={`${shoucang}`}/><span>{this.state.article.save || "收藏"}</span></li>
                    <li><img src={`${dianzan}`}/><span>{this.state.article.agree || "点赞"}</span></li>
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
