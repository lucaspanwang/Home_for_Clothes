import React, { Component } from 'react'
import { NavBar, Button } from 'antd-mobile';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './store.css'

import BoxBack from '../images/box-back.jpeg';
import Box from '../images/timg9.png';

var style = {
    width: "100%",
    height: "400px",
    backgroundImg: `url(${BoxBack})`
}
export default class AppBox extends Component {
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${BoxBack})`, backgroundSize: '150%,100%' }}>
                <NavBar style={{ color: 'white', backgroundColor: 'rgb(252, 157, 154)' }}>整理箱</NavBar>
                <Router>
                    <Link onClick={()=>{this.hrefChange('insert')}}><Button style={{ backgroundColor: 'rgb(252,157,154)', width: '80px', margin: '10px' }}>导入</Button></Link>
                    <div id="store">
                        <img src={Box} style={{ width: '80%', height: '80%',top:'0', margin: '60% 10% 0 10%' }} />
                        <div id="fiveBut">
                            <li id="oneBut">
                                <Link onClick={()=>{this.hrefChange('add')}}><button>+<br />添加</button></Link>
                                <Link onClick={()=>{this.hrefChange('add')}}><button>+<br />添加</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link onClick={()=>{this.hrefChange('home')}}><button>家</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link onClick={()=>{this.hrefChange('robe')}}><button>衣柜</button></Link>
                            </li>
                            <li id='twoBut'>
                                <Link onClick={()=>{this.hrefChange('trunk')}}><button>行李箱</button></Link>
                            </li>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
