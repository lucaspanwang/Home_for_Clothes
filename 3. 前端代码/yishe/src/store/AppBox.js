import React, { Component } from 'react'
import { NavBar, Button,SearchBar,WhiteSpace, WingBlank } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import './store.css'

import BoxBack from '../images/box-back.jpeg';
import Box from '../images/timg9.png';

var style = {
    width: "100%",
    height: "400px",
    backgroundImg: `url(${BoxBack})`
}
export default class AppBox extends Component {
    constructor(){
        super();
        this.state={
            value:'添加'
        }
    }    
    componentDidMount(){
        fetch('http://47.98.163.228:8084/change')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                value:res
            })
            console.log('后台传来：',res);
        })
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
                        style={{width:'280px',position:'absolute',top:'7.5%',
                        left:'120%',backgroundColor: 'rgba(252,157,154,0.7)',borderRadius:'5px'}}
                        />
                    </div>
                    <div id="store">
                        <img src={Box} style={{width: '85%', height: '80%', margin: '60% 6%'}} />
                        <div id="fiveBut">
                            <li id="oneBut">
                                <Link to={"/add/"+this.props.id}><button>+<br />{this.state.value}</button></Link>
                                <Link to={"/add/"+this.props.id}><button>+<br />添加</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link to={"/home/"+this.props.id}><button>家</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link  to={"/robe/"+this.props.id}><button>衣柜</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link to={"/trunk/"+this.props.id}><button>行李箱</button></Link>
                            </li>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
