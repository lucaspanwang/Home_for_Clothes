import React from "react";
import { TabBar } from "antd-mobile";

import shequ from './images/社区.png'
import shequ1 from './images/社区 (1).png'
import chuanda from './images/试衣间.png'
import chuanda1 from './images/试衣间 (1).png'
import zhenglixiang from './images/整理箱.png'
import zhenglixiang1 from './images/整理箱 (1).png'
import riji from './images/日记.png'
import riji1 from './images/日记 (1).png'
import geren from './images/个人.png'
import geren1 from './images/个人 (1).png'

import Wear from './wear/Wear'
import AboutUs from "./me/AboutUs";
import Setup from "./me/Setup";
import Diary from "./diary/Diary";
import AboutMe from "./me/AboutMe";
import Community from "./community/Community";
import Me from "./me/Me";
import Article from "./community/Article";
import AppBox from "./store/AppBox";
import Login from "./login/Login";
import Advertise from "./login/Advertise";
import Forget from "./login/Forget";
import Register from "./login/Register";
import ResetPwd from "./login/ResetPwd";
import Add from "./store/Add";
import Home from "./store/Home";
import TestWrapper from "./store/Insert";

export default class AppTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "blueTab"
    };
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
            selected={this.state.selectedTab === "blueTab"}
            onPress={() => {
              this.setState({
                selectedTab: "blueTab"
              });
            }}
          >
            <Advertise />
            <Login />
            <Forget />
            <ResetPwd />
            <Register />
            <Community />
            <Article />
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:chuanda
            }}
            selectedIcon={{
              uri:
                chuanda1
            }}
            title="穿搭"
            key="chuanda"
            selected={this.state.selectedTab === "bTab"}
            onPress={() => {
              this.setState({
                selectedTab: "bTab"
              });
            }}
          >
          <Wear />
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
            // dot
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              this.setState({
                selectedTab: "greenTab"
              });
            }}
          >
          <AppBox />
          <Add />
          <Home />
          <TestWrapper />
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:riji
            }}
            selectedIcon={{
              uri:
                riji1
            }}
            title="日记"
            key="riji"
            selected={this.state.selectedTab === "yellowTab"}
            onPress={() => {
              this.setState({
                selectedTab: "yellowTab"
              });
            }}
          >
          <Diary />
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
            selected={this.state.selectedTab === "aTab"}
            onPress={() => {
              this.setState({
                selectedTab: "aTab"
              });
            }}
          >
            <Me />
            <AboutUs/>
            <Setup />
            <AboutMe />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
