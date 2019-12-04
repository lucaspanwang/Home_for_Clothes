import React, { Component } from 'react'
import { NavBar,Grid,Tabs,WhiteSpace} from 'antd-mobile';
import './wear.css';

import didian from '../images/地点1.png'
import xiayu from '../images/下雨.png'
import qing from '../images/晴.png'
import mote from '../images/模特.png'
import fenxiang from '../images/分享.png'
import pengyouquan from '../images/朋友圈.png'
import weixin from '../images/微信.png'
import weibo from '../images/微博.png'
import QQ from '../images/QQ (2).png'
import kongjian from '../images/qq空间.png'
import shequ from '../images/社区.png'
import chuandariji from '../images/图片.png'
import fuzhilianjie from '../images/复制链接.png'
import buganxingqu from '../images/不感兴趣_44.png'
import jubao from '../images/举报.png'
import xiaoren from '../images/小人.png'
import beijing from '../images/雨.jpg'

const data = Array.from(new Array(5)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));
const data2 = Array.from(new Array(5)).map(() => ({
    icon:[chuandariji,shequ,fuzhilianjie,buganxingqu,jubao]
}));
const data1 = Array.from(new Array(5)).map(() => ({
  icon:[weixin,pengyouquan,weibo,QQ,kongjian]
}));
const c=['#00cc00','#ccff99','white','#3399ff','#FFCC66'];
const w_t=[xiayu,qing]

export default class Wear extends Component {

    constructor(){
      super();
      this.state = {
          data:[],
          ss: ['微信好友','朋友圈','微博','QQ好友','QQ空间'],
          ss1: ['穿搭日记','社区','复制链接','不感兴趣','举报'],
          url:'http://192.168.233.144:8080/weather',
          city:'',
          temperature:'',
          dressing_advice:'',
          weather:'',
          idx:0,
      }
    }    
    componentDidMount(){
        // fetch(this.state.url)
        // .then(res=>res.json())
        // .then(res=>{
        //     {
        //         console.log(res.result.today)
        //         this.setState({
        //           city:res.result.today.city,
        //           temperature:res.result.today.temperature,
        //           dressing_advice:res.result.today.dressing_advice,
        //           weather:res.result.today.weather
        //         })
        //         if(this.state.weather === '晴'){
        //           this.setState({
        //             idx:1,
        //           })
        //         }
        //         if(this.state.weather === '雨'){
        //           this.setState({
        //             idx:0,
        //           })
        //         }
        //     }
        // })

    }
    click_share=()=>{
      var div = document.getElementById('fenxiang');
      div.style.display='block'
    }
    click_unShare=()=>{
      var div = document.getElementById('fenxiang');
      console.log(div);
      div.style.display='none'
    }
    hrefChange(str){
      var h=window.location.href;
      var index = h.lastIndexOf("\/");  
      window.location.href = h.substring(0, index+1)+str;
    }

    render() {
        return (
            <div className="body" style={{width:'100%',height:'100%',background:"url("+beijing+")"}}>
              {/* 头 */}
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}
                >穿搭</NavBar>
              {/* 天气 */}
                <div className="daohang">
                    <img src={didian} style={{width:'30px',float:'left',position:'relative',top:'-5px'}} key="fan1"/>
                    <span id="shi">{this.state.city}</span>
                    <span>今日天气:</span>
                    <img src={w_t[this.state.idx]} style={{width:'25px',float:'left',marginLeft:'5px',marginRight:'5px'}} key="fan2"/>
                    <span style={{marginLeft:'5px',marginRight:'15px'}}>{this.state.weather}</span>
                    <span>{this.state.temperature}</span>
                    <p style={{fontWeight:'800',textShadow:'#000 3px 0 0,#000 0 3px 0,#000 -1px 0 0,#000 0 -1px 0',}}>
                      <br />
                      {this.state.dressing_advice}
                    </p>
                </div>
                {/* 模特 */}
                <img src={mote} id="mote"/>
                {/* 衣物栏 */}
                <TabExample />
                <a onClick={this.click_share} id="zhenglitab">
                    <img src={fenxiang} style={{width:'30px',float:'right',position:'relative',bottom:'-170px',right:'10px'}} key="fanxiang"/>
                </a>
                {/* 小人 */}
                <img src={xiaoren} id="xiaoren"/>
                {/* 分享栏 */}
                  <div id="fenxiang">
                    <p>分享至</p>
                      <Grid data={data1}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                          <div >
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px' ,borderRadius:'50px',backgroundColor:c[idx]}} alt="" />
                          <div>
                              <span>{this.state.ss[idx]}</span>
                          </div>
                          </div>
                      )}
                    />
                  <hr />
                  <Grid data={data2}
                      columnNum={5}
                      renderItem={(dataItem,idx) => (
                          <div >
                          <img src={dataItem.icon[idx]} style={{ width: '40px', height: '40px'}} alt="" />
                          <div>
                              <span>{this.state.ss1[idx]}</span>
                          </div>
                          </div>
                      )}
                    />
                    <hr />
                    <p onClick={this.click_unShare}>取消</p>
                  </div>
            </div>
        );
    }
}

const tabs = [
  { title: '为你推荐'},
  { title: '外套' },
  { title: '上衣'},
  { title: '裤子'},
  { title: '连衣裙'},
];

const TabExample = () => (
  <div id="yiwu">
    <WhiteSpace />
    <Tabs tabs={tabs}
      initialPage={0}
      tabBarPosition="left"
      tabDirection="vertical"
    >
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
      <div style={{width:'100px', display: 'flex',
        height: '500px', backgroundColor: '#fff' }}>
        <ul className="yifu">
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
            <li style={{height:'100px'}}></li>
        </ul>
      </div>
    </Tabs>
    <WhiteSpace />
  </div>
);
