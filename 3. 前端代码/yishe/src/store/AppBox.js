import React, { Component } from 'react'
import { NavBar, Button,SearchBar,WhiteSpace, WingBlank } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import './store.css'

import BoxBack from '../images/box-back.jpeg';
import Box from '../images/timg9.png';
let count=0;
let jiaNum=0;
let guiNum=0;
let xingNum=0;
var style = {
    width: "100%",
    height: "400px",
    backgroundImg: `url(${BoxBack})`
}
// 页面加载完前运行的函数
window.onpageshow=function(){
   
            
}
export default class AppBox extends Component {
    constructor(props){
        super(props);
        this.state={
            place:[],//位置名称
            value:'',
            where:'家',
            jia:'',
            xing:'',
            gui:'',
            display:'none',
            display1:'none',
            display2:'none'
        }
    }   
    // 根据名字查找位置（回车事件）
    fondWhere=(value)=>{
        console.log(value);
        var id=this.props.id;
        fetch(`http://47.98.163.228:3003/seek/${value}/${id}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            if(res=='不存在'){
                alert('不存在')
            } else {
                var where = res.whereId;
                var picture=res.picture;
                localStorage.setItem('搜索',picture)
                if (where == '1') {
                    window.location.href = window.location.href.split('#')[0] + '#/home/' + this.props.id
                } else if (where == '2') {
                    window.location.href = window.location.href.split('#')[0] + '#/robe/' + this.props.id
                } else if (where == '3') {
                    window.location.href = window.location.href.split('#')[0] + '#/trunk/' + this.props.id
                }
            }
        })
        
    } 
    //添加一的单双击
    double = () => {
        count += 1;
        setTimeout(() => {
            console.log(count)
            if (count == 1) {
                if(this.state.place[3]!='添加'){
                    window.location.href = window.location.href.split('#')[0]+'#/customize/' + this.props.id
                }
                // count = 0;
            } else if (count == 2) {
                window.location.href = window.location.href.split('#')[0]+'#/add/' + this.props.id
                // count = 0;
            }
            count=0;
        }, 200)

    }
    //家更改div的display
    jia = () => {
        jiaNum += 1;
        setTimeout(() => {
            console.log(count)
            if (jiaNum == 1) {
                 window.location.href = window.location.href.split('#')[0]+'#/home/' + this.props.id
                jiaNum = 0;
            } else if (jiaNum == 2) {
                this.setState({
                    display:'block'
                })
                jiaNum=0;
            }
        }, 200)
    }
    //柜子更改div的display
    guizi = () => {
        guiNum += 1;
        setTimeout(() => {
            if (guiNum == 1) {
                 window.location.href = window.location.href.split('#')[0]+'#/robe/' + this.props.id
                guiNum = 0;
            } else if (guiNum == 2) {
                this.setState({
                    display1:'block'
                })
                guiNum=0;
            }
        }, 200)
    }
    //行李箱更改div的display
    xinglixiang = () => {
        console.log(xingNum)
        xingNum += 1;
        setTimeout(() => {
            if (xingNum == 1) {
                window.location.href = window.location.href.split('#')[0] + '#/trunk/' + this.props.id
                xingNum = 0;
            } else if (xingNum == 2) {
                this.setState({
                    display2: 'block'
                })
                xingNum = 0;
            }
        }, 200)
    }
    //获取更改的值
    value=(data,ev)=>{
        if(data=='xing'){
            // console.log(ev.target.value)
            this.setState({
                xing:ev.target.value
            })
        }
        if(data=='jia'){
            this.setState({
                jia:ev.target.value
            });
        } 
        if(data='gui'){
            this.setState({
                gui:ev.target.value
            })
        }
        
    }
    //提交更改的值
    sub=(data,ev)=>{
        if(data=='jia'){
            var p=[];
            p=this.state.place;
            p[0]=this.state.jia
            this.setState({
                place:p
            })
            fetch('http://47.98.163.228:3003/change', {
                method: 'post',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.props.id,
                    value:this.state.jia,
                    place:'one'
                })
            })
            this.setState({
                display:'none'
            })
        }else if(data=='gui'){
            var p=[];
            p=this.state.place;
            p[1]=this.state.gui;
            this.setState({
                place:p
            })
            fetch('http://47.98.163.228:3003/change', {
                method: 'post',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.props.id,
                    value:this.state.gui,
                    place:'two'
                })
            })
            this.setState({
                display1:'none'
            })
        }else if(data=='xing'){
            var p=[];
            p=this.state.place;
            p[2]=this.state.xing;
            this.setState({
                place:p
            })
            fetch('http://47.98.163.228:3003/change', {
                method: 'post',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.props.id,
                    value:this.state.xing,
                    place:'three'
                })
            })
            this.setState({
                display2:'none'
            })
        }
    }
    
    componentDidMount(){
        //各个位置显示
        var place=[]
        fetch('http://47.98.163.228:3003/place/'+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            place.push(res[0].placeOne)
            place.push(res[0].placeTwo)
            place.push(res[0].placeThree)
            place.push(res[0].placeFour)
            place.push(res[0].placeFive)
            this.setState({
                place:place
            })
        })

        // if(localStorage.getItem('添加')==undefined){
        //     this.setState({
        //         value:'添加'
        //     })
        // }else{
        //     this.setState({
        //         value:localStorage.getItem('添加')
        //     })
        // }
        // console.log('本地存储'+localStorage.getItem('添加'))
        // fetch('http://47.98.163.228:8084/change')
        // .then(res=>res.json())
        // .then(res=>{
        //     this.setState({
        //         value:res
        //     })
        //     console.log('后台传来：',res);
        // });
        // 通过id判断性别
        // fetch("http://47.98.163.228:8089/insertSex", {
        //     method: 'post', 
        //     "Access-Control-Allow-Origin" : "*",
        //     "Access-Control-Allow-Credentials" : true,
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //         // 'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({
        //       userId:this.props.id
        //     })
        //   });
    }

    

    render() {
        return (
            <div style={{ backgroundImage: `url(${BoxBack})`, backgroundSize: '150%,100%' }}>
                <NavBar style={{ color: 'white', backgroundColor: 'rgb(252, 157, 154)' }}>整理箱</NavBar>
                <Router>
                    <Link to={"/insert/"+this.props.id}><Button style={{ 
                        backgroundColor: 'rgb(252,157,154)', width: '60px', margin: '10px' }}>
                            导入</Button>
                    </Link>
                    <div id="nameCha" >
                        <SearchBar placeholder="请输入你要查找的名字" maxLength={4} 
                        style={{width:'280px',position:'relative',top:'-55px',left:'21%',
                    backgroundColor: 'rgba(252,157,154,0.7)',borderRadius:'5px'}}
                        onSubmit={this.fondWhere.bind(this.value)}
                        />
                    </div>
                    <div id="store">
                        <img src={Box} style={{width: '85%', height: '80%', margin: '20% 7%'}} />
                        <div id="fiveBut">
                            <li id="oneBut">
                                <button onClick={this.double} style={{float:"left"}}>{this.state.place[3]}</button>
                                <button style={{float:"left"}}>添加</button>
                            </li>
                            <li id='twoBut'>
                                <button onClick={this.jia}>
                                    {this.state.place[0]}
                                    {/* {localStorage.getItem('jia')?localStorage.getItem('jia'):'家'} */}
                                </button>
                                {/* <Link to={"/home/"+this.props.id}><button>家</button></Link> */}
                            </li>
                            <li id='twoBut'>
                               <button onClick={this.guizi}>
                                   {this.state.place[1]}
                                   {/* {localStorage.getItem('guizi')?localStorage.getItem('guizi'):'衣柜'} */}
                                </button>
                                {/* <Link  to={"/robe/"+this.props.id}><button>衣柜</button></Link> */}
                            </li>
                            <li id='twoBut'>
                               <button onClick={this.xinglixiang}>
                                   {this.state.place[2]}
                                   {/* {localStorage.getItem('xinglixiang')?localStorage.getItem('xinglixiang'):'行李箱'} */}
                                </button>
                                {/* <Link to={"/trunk/"+this.props.id}><button>行李箱</button></Link> */}
                            </li>
                        </div>
                    </div>
                </Router>
                <div id='jia' style={{width:'90%',height:'200px',marginLeft:'5%',display:this.state.display,
                        backgroundColor:"rgba(169,169,169,0.8)",borderRadius:'45px',
                        position:"relative",top:'-500px',paddingTop:'10%',borderWidth:'3px',borderStyle:'solid'}}>
                        <h2 style={{ margin: '5%', fontWeight: "lighter",color:'rgb(165,42,42)',}}>请输入你想修改的名称:</h2>
                        <input type="type" style={{ marginLeft: '5%', height: '40px' }} onChange={this.value.bind(this,'jia')}/>
                        <input type="submit" style={{ height: '40px', width: '60px' }} onClick={this.sub.bind(this,'jia')}/>
                </div>
                <div id='guizi' style={{display:'none',width:'90%',height:'200px',marginLeft:'5%',display:this.state.display1,
                        backgroundColor:"rgba(169,169,169,0.8)",borderRadius:'45px',
                        position:"relative",top:'-500px',paddingTop:'10%',borderWidth:'3px',borderStyle:'solid'}}>
                        <h2 style={{ margin: '5%', fontWeight: "lighter",color:'rgb(165,42,42)',}}>请输入你想修改的名称:</h2>
                        <input type="type" style={{ marginLeft: '5%', height: '40px' }} onChange={this.value.bind(this,'gui')}/>
                        <input type="submit" style={{ height: '40px', width: '60px' }} onClick={this.sub.bind(this,'gui')}/>
                </div>
                <div id='xinglixiang' style={{display:'none',width:'90%',height:'200px',marginLeft:'5%',display:this.state.display2,
                        backgroundColor:"rgba(169,169,169,0.8)",borderRadius:'45px',
                        position:"relative",top:'-500px',paddingTop:'10%',borderWidth:'3px',borderStyle:'solid'}}>
                        <h2 style={{ margin: '5%', fontWeight: "lighter",color:'rgb(165,42,42)',}}>请输入你想修改的名称:</h2>
                        <input type="type" style={{ marginLeft: '5%', height: '40px' }} onChange={this.value.bind(this,'xing')}/>
                        <input type="submit" style={{ height: '40px', width: '60px' }} onClick={this.sub.bind(this,'xing')}/>
                </div>

                
            </div>
        )
    }
}
