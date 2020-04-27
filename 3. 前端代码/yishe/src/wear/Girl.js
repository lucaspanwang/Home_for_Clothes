//引入
import React, { Component } from 'react'
import { NavBar,Grid,Tabs,WhiteSpace} from 'antd-mobile';
import { NoticeBar, Icon } from 'antd-mobile';
import './wear.css';
import didian from '../images/didian.png'
import qing from '../images/yang.png'
import mote from '../images/mote.png'
import mote2 from '../images/motewu.png'
import fenxiang from '../images/fenxiang(1).png'
import pengyouquan from '../images/pengyouquan.png'
import weixin from '../images/weixin (2).png'
import weibo from '../images/weibo (2).png'
import QQ from '../images/QQ (2).png'
import kongjian from '../images/qqkongjian.png'
import shequ from '../images/shequ.png'
import chuandariji from '../images/tupian.png'
import fuzhilianjie from '../images/fuzhilianjie.png'
import buganxingqu from '../images/buganxingqu_44.png'
import jubao from '../images/jubao.png'
import xiaoren0 from '../images/xiaoren.png'
import beijing from '../images/yu.gif'
import beijing2 from '../images/qing.jpg'
import yun from '../images/yun.png'
import xiayu from '../images/xiayu.png'
import {Link} from 'react-router-dom'
//美妆部分图片
//图片导入
import t0 from '../images/t0.png'
import t1 from '../images/t1.png'
import t2 from '../images/t2.png'
import t3 from '../images/t3.png'
import t4 from '../images/t4.png'
import t5 from '../images/t5.png'
import t6 from '../images/t6.png'
import y1 from '../images/y1.png'
import y2 from '../images/y2.png'
import y3 from '../images/y3.png'
import y4 from '../images/y4.png'
import e1 from '../images/e1.png'
//变色
import t1_bai from '../images/pre/t1_bai.png'
import t1_hair from '../images/pre/t1_hair.png'
import t4_bai from '../images/pre/t4_bai.png'
import t4_hair from '../images/pre/t4_hair.png'
import t5_bai from '../images/pre/t5_bai.png'
import t5_hair from '../images/pre/t5_hair.png'
import t6_bai from '../images/pre/t6_bai.png'
import t6_hair from '../images/pre/t6_hair.png'

//美妆部分
const hair = [t0,t1,t2,t3,t4,t5,t6]
const hair_bai = [t1_bai,t1_bai,t1_bai,t1_bai,t4_bai,t5_bai,t6_bai]
const hair_hair = [t1_bai,t1_hair,t1_hair,t1_hair,t4_hair,t5_hair,t6_hair]
const glasses = [y1,y2,y3,y4]
const eye = [e1]

const tabs = [
    { title: '为你推荐'},
    { title: '外套' },
    { title: '上衣'},
    { title: '裤子'},
    { title: '连衣裙'},
  ];

export default class Girl extends Component {
    constructor(){
        super();
        this.state = {
            color:'',//发色
            index1:0,//发型
            index2:-1,//瞳色
            index3:-1,//眼镜
        }
      }    
    componentDidMount(){
        console.log(this.props.id)
        fetch('http://47.98.163.228:3001/get_mote_style',{
          method: 'post', 
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Credentials" : true,
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({userId:this.props.id})  
        })
        .then(res=>res.json())
        .then(res=>{
          console.log('get_mote_style:'+JSON.stringify(res));
          var arr = JSON.stringify(res);
          console.log(JSON.parse(arr)[0].userId)
          this.setState({
            index1:JSON.parse(arr)[0].index1,
            index2:JSON.parse(arr)[0].index2,
            index3:JSON.parse(arr)[0].index3,
            color:JSON.parse(arr)[0].color,
          })
          console.log(this.state.color)
          if(this.state.color !== ''){
            document.getElementById('change_hair_color').style.display='block';
            document.getElementById('change_hair_style').style.display='block';
            document.getElementById('change_hair_color').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
            document.getElementById('change_hair_color').style.opacity=0.9
          }
        })
    }
    render() {
        return (
            <div>
                {/* 模特 */}
                <img src={mote2} id="mote"/>
                <img src={mote2} id="mote_2"/>
               <div className="icon" id="mote22"><img  className='icon3'  id="mote_4" /></div>
                <img  id='mote2' />
                <img  id='mote3' />
                <img  id='mote4' />               
                <div className="icon" id="mote22"><img  className='icon4'  id="mote_5" /></div>
                <img  id='mote6' />
                {/* 模特的美妆部分 */}
                <Link to={"/pretty/"+this.props.id}>
                  <img src={eye[this.state.index2]} id="t22"/>
                  <img src={glasses[this.state.index3]} id="t33"/>
                  <img src={hair[this.state.index1]} className="t00"/>
                  {/* 改变发色 */}
                  <img src={hair_bai[this.state.index1]} className="t00" style={{left:'-120px',display:"none"}} id="change_hair_color"/>
                  <img src={hair_hair[this.state.index1]} style={{display:"none"}} className="t00" id="change_hair_style"/>
                  </Link>                
            </div>
        )
    }
}
