import React, { Component } from 'react';
import { NavBar,Popover,List } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { Col,Typography} from 'antd';
import './community.css';

import fanhui from '../images/fanhui_1.png';
import male from '../images/male.png';
import female from '../images/female.png';
import user from '../images/user_1.png';
import city from '../images/city_1.png';
import intro from '../images/intro_1.png';
import article from '../images/article_1.png';
import guanzhu from '../images/guanzhu_2.png';
import sixin from '../images/sixin.png';

const Item = List.Item;
const { Paragraph } = Typography;

export default class Others extends Component {
    constructor(){
      super();
      this.onback = this.onback.bind(this);
      this.state = {
        user:{},
        detail:[],
        follow:false
      }
    }
    componentDidMount(){
        fetch("http://47.98.163.228:3004/users?userId="+this.props.match.params.id.split("&")[0])
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
            }
            this.setState({
                user:res[0]
            })
        });
        fetch("http://47.98.163.228:3004/detail?userId="+this.props.match.params.id.split("&")[0])
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                detail:res
            })
        });
        fetch("http://47.98.163.228:3004/care?userId="+this.props.match.params.id.split("&")[1]+"&careId="+this.props.match.params.id.split("&")[0])
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                follow:Boolean(res.length)
            })
        })
    }
    //关注/取消关注
    onCare = () =>{
        if(this.state.follow){
            fetch("http://47.98.163.228:3004/careDelete?userId="+this.props.match.params.id.split("&")[1]+"&careId="+this.props.match.params.id.split("&")[0])
            .then(res=>{
                this.setState({
                    follow:false
                })
            })
        }else{
            fetch("http://47.98.163.228:3004/careAdd?userId="+this.props.match.params.id.split("&")[1]+"&careId="+this.props.match.params.id.split("&")[0])
            .then(res=>{
                this.setState({
                    follow:true
                })
            })
        }
        fetch("http://47.98.163.228:3004/detail?userId="+this.props.match.params.id.split("&")[0])
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                detail:res
            })
        });
    }
    onback=()=>{
        // console.log(this.props.history.location);
        this.props.history.go(-1);
    }
    render() {
        return (
            <div>
                <NavBar 
                    style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                    leftContent={<img src={fanhui} style={{width:'30px'}} key="artfan" onClick={this.onback} />}
                ></NavBar>
                <NavBar style={{width:'100%',backgroundColor:'#fc9d9a'}}></NavBar>

                <div className="theOthers" style={{backgroundColor:'#fc9d9a'}}>
                    <div className="userMessage">
                        <img src={this.state.user.userPic} alt="个人头像"/>
                        <span>
                            {this.state.user.userName}
                            <img src={this.state.user.userSex=='男'?male:female}/>
                        </span>
                    </div>
                    <div className="userDetail" style={{border:'1px solid #fc9d9a'}}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h3>{this.state.detail[0]}</h3><h4>发帖</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h3>{this.state.detail[1]}</h3><h4>衣服</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h3>{this.state.detail[2]}</h3><h4>关注</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h3>{this.state.detail[3]}</h3><h4>粉丝</h4></div>
                        </Col>
                    </div>
                </div>

                <List style={{margin:'70px 10px 0 10px',borderBottom:'8px solid #eee'}}>
                    <Item
                    style={{borderBottom:"1px solid #ddd",margin:'8px 0'}}
                    thumb={user}
                    >账号：{this.state.user.userId}</Item>
                    <Item
                    style={{borderBottom:"1px solid #ddd",margin:'8px 0'}}
                    thumb={city}
                    >城市：{this.state.user.userCity}</Item>
                    <Item
                    style={{borderBottom:"1px solid #ddd",margin:'8px 0'}}
                    thumb={intro}
                    ><Paragraph ellipsis={{rows:1}} style={{margin:0,color:'#000'}}>简介：{this.state.user.userIntro}</Paragraph></Item>
                    <Link to={"/otherArticle/"+this.props.match.params.id}>
                    <Item
                    style={{margin:'8px 0'}}
                    thumb={article}
                    onClick={() => {}}
                    arrow="horizontal"
                    >发帖</Item></Link>
                </List>
                <List style={{margin:'10px'}}>
                    <Item
                    style={{borderBottom:"1px solid #ddd",margin:'8px 0'}}
                    thumb={guanzhu}
                    onClick={this.onCare}
                    >{this.state.follow?'取消关注':'关注用户'}</Item>
                    <Item
                    style={{margin:'8px 0'}}
                    thumb={sixin}
                    >与他私信</Item>
                </List>
            </div>)
    }
}
