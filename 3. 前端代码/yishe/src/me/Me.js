import React, { Component } from 'react';
import { NavBar,List } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import { Row, Col } from 'antd';

import xiangqing from '../images/xiangqing.png';
import shoucang from '../images/shoucang_2.png';
import xiangce from '../images/xiangce.png';
import diary from '../images/diary.png';
import fankui from '../images/fankui.png';
import shezhi from '../images/shezhi.png';
import qipao from '../images/qipao.png';
// import xiaoren from '../images/xiaoren.png';
import girl from '../images/girl.gif';
import boy from '../images/boy.gif';
import sunny from '../images/sunny.png';
import windy from '../images/windy.png';
import rain from '../images/rain.png';
import snow from '../images/snow.png';
import { Modal, Button, WhiteSpace } from 'antd-mobile';

var weather = [sunny,windy,rain,snow]

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

const Item = List.Item;
const Brief = Item.Brief;

var num = 1;
export default class Me extends Component {
    constructor(){
        super();
        this.state = {
            user:{},
            detail:[],
            display:'none',
            wenti:'none',
            tianqi:'none',
            tuijian:'none',
            modal1: false,
            city:'',
            wea:'',
            tips:'',
            tem1:'',
            tem2:'',
            air:'',
            idx:0,
            desc:''
        }
    }  
    componentDidMount(){
        if(localStorage.getItem('comee')){
            window.location.reload();
            localStorage.removeItem('comee')
        }
        fetch("http://47.98.163.228:3000/users?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j);
            }
            this.setState({
                user:res[0],
                city:res[0].userCity,
            })
            console.log(this.state.city)
        });
        fetch("http://47.98.163.228:3004/detail?userId="+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                detail:res
            })
        });

       
    }
    onClick3 = ()=>{
        if(num == 1){
            this.setState({ display:'block' });
            num = num+1;  
        }else{
            this.setState({ display:'none' });
            num = num-1;
        }
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    onClick1 = ()=>{
        this.setState({ display:'none' ,wenti:'block'});

    }
    getWeather = () =>{
        console.log(this.state.city)
        var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+this.state.city+'&appid=24444633&appsecret=cgkFXVq9'
        var url = global.encodeURI(addr);
        console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({ 
                display:'none',
                tianqi:'block',
                // wea:res.data[0].wea,
                // tem1:res.data[0].tem1,
                // tem2:res.data[0].tem2,
                // tips:res.data[0].air_tips,
                // air:res.data[0].air_level
            },function(){
                if(this.state.wea.search(/晴/)!==-1){
                    this.setState({idx:0})
                }else if(this.state.wea.search(/雨/)!==-1){
                    this.setState({idx:2})
                }else if(this.state.wea.search(/雪/)!==-1){
                    this.setState({idx:3})
                }else{
                    this.setState({idx:1})
                    console.log(this.state.idx)
                }
                console.log(this.state.idx)
            })   
        });
    }
    getWeather1 = () =>{
        console.log(this.state.city)
        var addr = 'http://www.tianqiapi.com/api/?version=v1&city='+this.state.city+'&appid=76925386&appsecret=JR3Ut1si'
        var url = global.encodeURI(addr);
        console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({ 
                display:'none',
                tuijian:'block',
                // desc:res.data[0].index[3].desc
            })   
        });
    }
  
      
    render() {
        return (
            <div style={{width:'100%',height:"100%"}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                >个人</NavBar>

                <div className="userMessage" style={{width:"100%",overflow:"auto",zoom:"1",padding:"0 5%",marginTop:"20px"}}>
                    <img src={this.state.user.userPic} alt="" style={{float:"left",width:"20%",borderRadius:"50%",marginRight:"3%"}}/>
                    <div className="userMessCenter" style={{float:"left",width:"70%"}}>
                        <h2>{this.state.user.userName}</h2>
                        <h4>简介：{this.state.user.userIntro}</h4>
                    </div>
                    <Link to={"/aboutme/"+this.props.id}><img src={xiangqing} alt="" style={{float:"left",width:"7%",padding:"7% 0"}}/></Link>
                </div>

                <div className="gutter-example" style={{width:"100%",textAlign:'center',marginTop:"5px",}}>
                    <Row gutter={20} style={{margin:"0 3%",borderTop:"2px solid #ddd"}}>
                        <Col className="gutter-row" span={6}>
                            <Link to={"/myarticle/"+this.props.id}><div className="gutter-box"><h4>{this.state.detail[0]}</h4><h4>发帖</h4></div></Link>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Link to={"/myclothing/"+this.props.id}><div className="gutter-box"><h4>{this.state.detail[1]}</h4><h4>衣服</h4></div></Link>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Link to={"/mycare/"+this.props.id}><div className="gutter-box"><h4>{this.state.detail[2]}</h4><h4>关注</h4></div></Link>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Link to={"/myfan/"+this.props.id}><div className="gutter-box"><h4>{this.state.detail[3]}</h4><h4>粉丝</h4></div></Link>
                        </Col>
                    </Row>
                </div>

                <List style={{borderTop:"5px solid #ddd",borderBottom:"5px solid #ddd",padding:"0 3%"}}>
                    <Link to={"/mycollect/"+this.props.id}><Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={shoucang}
                    arrow="horizontal"
                    onClick={() => {}}
                    >收藏</Item></Link>
                    <Link to={"/diary/"+this.props.id}><Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={diary}
                    onClick={() => {}}
                    arrow="horizontal"
                    >日记</Item></Link>
                    <Link to={"/myfankui/"+this.props.id}>
                    <Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={fankui}
                    onClick={() => {}}
                    arrow="horizontal"
                    >反馈</Item></Link>
                    <Link to={"/setup/"+this.props.id}><Item
                    thumb={shezhi}
                    arrow="horizontal"
                    >设置</Item></Link>
                </List>
                {/* 衣舍娃娃 */}
                {
                    this.state.user.userSex==='女'?(
                        <div>
                            <img src={girl} alt='' onClick={this.onClick3}  style={{width:'30%',marginTop:'2px',marginLeft:'30px',float:'left'}}/>
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',height:'142px',display: this.state.display,backgroundImage:"url(" + require("../images/qipao.png") + ")",backgroundSize:' 100%'}}>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'#00c7ff',color:'white',marginLeft:'40px',marginTop:'18px'}} onClick={()=>this.setState({ display:'none' ,wenti:'block'})}>常见问题</button><br/>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'red',opacity:'0.6',color:'white',marginLeft:'40px',marginTop:'5px'}}  onClick={this.getWeather}>今日天气</button>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'pink',color:'white',marginLeft:'40px',marginTop:'5px'}}  onClick={this.getWeather1}>穿衣指南</button>
                            </div>
                            {/* 常见问题 */}
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'6px',height:'150px',border:'3px solid #00c7ff',borderRadius:'10px',display: this.state.wenti}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>&nbsp;常见问题 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,wenti:'none'});num=1;}}>X</span></span>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px',marginTop:'5px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                            </div>
                            {/* 今日天气 */}
                            {/* <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid red',borderRadius:'10px',display: this.state.tianqi}}>
                                <div style={{width:'100%',height:'30px'}}>
                                    <span style={{fontSize:'18px',float:'left'}}>{this.state.city}</span>
                                    <img src={weather[this.state.idx]} alt='' style={{width:'30px',float:'right'}}/>
                                </div>
                                <span style={{float:'left',color:'#d26c2e'}}>{this.state.wea}&nbsp; |&nbsp;{this.state.tem2}~{this.state.tem1} |&nbsp; 天气质量&nbsp;{this.state.air}</span>
                                <p style={{fontSize:'11px'}}>{this.state.tips} <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tianqi:'none'});num=1;}}>X</span></p>
                            </div> */}
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid red',borderRadius:'10px',display: this.state.tianqi}}>
                                <div style={{width:'100%',height:'30px'}}>
                                    <span style={{fontSize:'18px',float:'left'}}>南京</span>
                                    <img src={windy} alt='' style={{width:'30px',float:'right'}}/>
                                </div>
                                <span style={{float:'left',color:'#d26c2e'}}>多云&nbsp; |&nbsp;20℃~28℃ |&nbsp; 天气质量&nbsp;良</span>
                                <p style={{fontSize:'11px'}}>天气较好，温度适宜，您可以尽情地享受大自然的风光。<span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tianqi:'none'});num=1;}}>X</span></p>
                            </div>
                            {/* 穿衣指南 */}
                            {/* <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid purple',borderRadius:'10px',display: this.state.tuijian}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>穿衣指南 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tuijian:'none'});num=1;}}>X</span></span>
                                <p style={{fontSize:'14px',marginTop:'3px'}}>{this.state.desc} </p>
                            </div> */}
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid purple',borderRadius:'10px',display: this.state.tuijian}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>穿衣指南 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tuijian:'none'});num=1;}}>X</span></span>
                                <p style={{fontSize:'14px',marginTop:'3px'}}>天气舒适，建议穿长袖T恤、衬衫加单裤等服装。 </p>
                            </div>

                        </div>

                    ):
                    (
                        <div>
                            <img src={boy} alt='' onClick={this.onClick3}  style={{width:'30%',marginTop:'2px',marginLeft:'30px',float:'left'}}/>
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',height:'142px',display: this.state.display,backgroundImage:"url(" + require("../images/qipao.png") + ")",backgroundSize:' 100%'}}>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'#00c7ff',color:'white',marginLeft:'40px',marginTop:'18px'}} onClick={()=>this.setState({ display:'none' ,wenti:'block'})}>常见问题</button><br/>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'red',opacity:'0.6',color:'white',marginLeft:'40px',marginTop:'5px'}}  onClick={this.getWeather}>今日天气</button>
                                <button style={{border:'none',borderRadius:'10px',width:'100px',height:'30px',backgroundColor:'pink',color:'white',marginLeft:'40px',marginTop:'5px'}}  onClick={this.getWeather1}>穿衣指南</button>
                            </div>
                            {/* 常见问题 */}
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'6px',height:'150px',border:'3px solid #00c7ff',borderRadius:'10px',display: this.state.wenti}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>&nbsp;常见问题 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,wenti:'none'});num=1;}}>X</span></span>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px',marginTop:'5px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                                <Button onClick={this.showModal('modal1')} style={{border:'1px solid #3c3a3ac9',fontSize:'12px',height:'30px',lineHeight:'30px'}}>如何找到自己的衣服在哪</Button>
                                <WhiteSpace />
                                <Modal
                                    visible={this.state.modal1}
                                    transparent
                                    maskClosable={false}
                                    onClose={this.onClose('modal1')}
                                    title="如何找到自己的衣服在哪"
                                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                    <div style={{ height: 100, overflow: 'scroll' }}>
                                        方法一:在“个人”->“衣服”中找到<br/>
                                        方法二:在“整理箱”页面搜索框搜索想要找的衣物的关键词进行搜索
                                    </div>
                                </Modal>
                            </div>
                            {/* 今日天气 */}
                            {/* <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid red',borderRadius:'10px',display: this.state.tianqi}}>
                                <div style={{width:'100%',height:'30px'}}>
                                    <span style={{fontSize:'18px',float:'left'}}>{this.state.city}</span>
                                    <img src={weather[this.state.idx]} alt='' style={{width:'30px',float:'right'}}/>
                                </div>
                                <span style={{float:'left',color:'#d26c2e'}}>{this.state.wea}&nbsp; |&nbsp;{this.state.tem2}~{this.state.tem1} |&nbsp; 天气质量&nbsp;{this.state.air}</span>
                                <p style={{fontSize:'13px'}}>{this.state.tips} <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tianqi:'none'});num=1;}}>X</span></p>
                            </div> */}
                             <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid red',borderRadius:'10px',display: this.state.tianqi}}>
                                <div style={{width:'100%',height:'30px'}}>
                                    <span style={{fontSize:'18px',float:'left'}}>南京</span>
                                    <img src={windy} alt='' style={{width:'30px',float:'right'}}/>
                                </div>
                                <span style={{float:'left',color:'#d26c2e'}}>多云&nbsp; |&nbsp;20℃~28℃ |&nbsp; 天气质量&nbsp;良</span>
                                <p style={{fontSize:'11px'}}>天气较好，温度适宜，您可以尽情地享受大自然的风光。<span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tianqi:'none'});num=1;}}>X</span></p>
                            </div>

                            {/* 穿衣指南 */}
                            {/* <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid purple',borderRadius:'10px',display: this.state.tuijian}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>穿衣指南 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tuijian:'none'});num=1;}}>X</span></span>
                                <p style={{fontSize:'14px',marginTop:'3px'}}>{this.state.desc} </p>
                            </div> */}
                            <div style={{float:'left',width:'50%',marginTop:'30px',marginLeft:'20px',padding:'10px',height:'150px',border:'3px solid purple',borderRadius:'10px',display: this.state.tuijian}}>
                                <span style={{width:'100%',fontWeight:'bolder'}}>穿衣指南 <span style={{float:'right'}} onClick={()=>{this.setState({ display:'none' ,tuijian:'none'});num=1;}}>X</span></span>
                                <p style={{fontSize:'14px',marginTop:'3px'}}>天气舒适，建议穿长袖T恤、衬衫加单裤等服装。 </p>
                            </div>
                        </div> 
                    )
                   
                }
                {/* <SocialApp/> */}
            </div>
        );
    }
}