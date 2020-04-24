import React from "react";
import { TabBar } from "antd-mobile";

import Wear from './wear/Wear'
import Community from "./community/Community";
import Me from "./me/Me";
import Message from './message/MIndex'
import AppBox from "./store/AppBox";

import shequ from './images/shequ.png'
import shequ1 from './images/shequ_1.png'
import chuanda from './images/chuanda.png'
import chuanda1 from './images/chuanda_1.png'
import zhenglixiang from './images/zhenglixiang.png'
import zhenglixiang1 from './images/zhenglixiang_1.png'
import geren from './images/geren.png'
import geren1 from './images/geren_1.png'
import xiaoxi from './images/message.png'
import xiaoxi1 from './images/message_1.png'

export default class AppTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "wear",
      url:"",
      userId:''
    };
  }
  componentDidMount(){
    var url = window.location.href;
    var tab = url.split('#')[1].split('&')[1];
    if(tab){
      this.setState({
        selectedTab:tab
      })
    }
    // if(this.props.location.query.tab){
    //   this.setState({
    //     selectedTab:this.props.location.query.tab
    //   })
    // }
    // if(this.props.location.query.userId){
    //   this.setState({
    //     userId:this.props.location.query.userId
    //   })
    // }
    this.setState({
      url:url.split('#')[0],
      userId:this.props.match.params.id.split('&')[0]
    })
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          top: 0
        }}
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#fc9d9a"
          barTintColor="white"
        >
          
          <TabBar.Item
            icon={{
              uri:chuanda
            }}
            selectedIcon={{
              uri:
                chuanda1
            }}
            title="穿搭"
            key="wear"
            selected={this.state.selectedTab === "wear"}
            onPress={() => {
              this.setState({
                selectedTab: "wear"
              },function(){
                window.location.href = this.state.url+'#/apptab/'+this.state.userId;
                console.log(window.location.href);
              });
            }}
          >
          <Wear id={this.state.userId}/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+zhenglixiang+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+zhenglixiang1+") center center /  21px 21px no-repeat"
                }}
              />
            }
            title="整理箱"
            key="zhenglixiang"
            selected={this.state.selectedTab === "store"}
            onPress={() => {
              this.setState({
                selectedTab: "store"
              },function(){
                window.location.href = this.state.url+'#/apptab/'+this.state.userId;
                console.log(window.location.href);
              });
            }}
          >
          <AppBox id={this.state.userId}/>
          </TabBar.Item>
          <TabBar.Item
            title="社区"
            key="shequ"
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+shequ+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url("+shequ1+") center center /  21px 21px no-repeat"
                }}
              />
            }
            selected={this.state.selectedTab === "community"}
            onPress={() => {
              this.setState({
                selectedTab: "community"
              },function(){
                window.location.href = this.state.url+'#/apptab/'+this.state.userId;
                console.log(window.location.href);
              });
            }}
          >
            <Community id={this.state.userId}/>
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:xiaoxi
            }}
            selectedIcon={{
              uri:
                xiaoxi1
            }}
            title="消息"
            key="xiaoxi"
            selected={this.state.selectedTab === "message"}
            onPress={() => {
              this.setState({
                selectedTab: "message"
              },function(){
                window.location.href = this.state.url+'#/apptab/'+this.state.userId;
                console.log(window.location.href);
              });
            }}
          >
            <Message id={this.state.userId}/>
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:geren
            }}
            selectedIcon={{
              uri:
                geren1
            }}
            title="个人"
            key="geren"
            selected={this.state.selectedTab === "me"}
            onPress={() => {
              this.setState({
                selectedTab: "me"
              },function(){
                window.location.href = this.state.url+'#/apptab/'+this.state.userId;
                console.log(window.location.href);
              });
            }}
          >
            <Me id={this.state.userId}/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
