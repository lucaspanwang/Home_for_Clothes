import React from "react";
import { TabBar } from "antd-mobile";
import shequ from '../images/社区.png'
import shequ1 from '../images/社区 (1).png'
import chuanda from '../images/试衣间.png'
import chuanda1 from '../images/试衣间 (1).png'
import zhenglixiang from '../images/整理箱.png'
import zhenglixiang1 from '../images/整理箱 (1).png'
import riji from '../images/日记.png'
import riji1 from '../images/日记 (1).png'
import geren from '../images/个人.png'
import geren1 from '../images/个人 (1).png';
import AppBox from './AppBox';
import Insert from './Insert';
import Home from './Home';
import Robe from './Robe';
import Trunk from './Trunk';
import Add from './Add';
import { Route, BrowserRouter as Router, Switch, Link ,Redirect} from 'react-router-dom';


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
                    "url(" + shequ + ") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" + shequ1 + ") center center /  21px 21px no-repeat"
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
            {/* <AppHome /> */}
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri: chuanda
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
            {/* <Chuanda /> */}
          </TabBar.Item>

          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" + zhenglixiang + ") center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(" + zhenglixiang1 + ") center center /  21px 21px no-repeat"
                }}
              />

            }
            title="整理箱"
            key="zhenglixiang"
            // dot
            selected={this.state.selectedTab === "greenTab"}
            onPress={() => {
              // window.location.href=window.location.href+'aaa'
              this.setState({
                selectedTab: "greenTab"
              });
            }}
          >
            <Router>
              <Switch>
                
                <Route path='/aaa' component={AppBox} />
                <Redirect exact from ='/' to='/aaa'/>
                <Route path='/insert' component={Insert}/>
                <Route path='/home' component={Home}/>
                <Route path="/robe" component={Robe}/>
                <Route path="/trunk" component={Trunk}/>
                <Route path='/add' component={Add}/>
              </Switch>
            </Router>
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri: riji
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
            {/* <AppMe /> */}
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri: geren
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
            {/* <AppMe /> */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
