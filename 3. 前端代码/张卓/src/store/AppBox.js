import React, { Component } from 'react'
import { NavBar, Button } from 'antd-mobile';
import BoxBack from '../images/box-back.jpeg';
import Box from '../images/timg9.png';
import Insert from './Insert.js';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import '../index.css'
var style = {
    width: "100%",
    height: "400px",
    backgroundImg: `url(${BoxBack})`
}
export default class AppBox extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${BoxBack})`, backgroundSize: '150%,100%' }}>
                <NavBar style={{ color: 'white', backgroundColor: 'rgb(252, 157, 154)' }}>整理箱</NavBar>
                <Link to='/insert'><Button style={{ backgroundColor: 'rgb(252,157,154)', width: '80px', margin: '10px' }}>导入</Button></Link>
                <div id="store">
                    <img src={Box} style={{ width: '85%', height: '80%', margin: '60% 6%' }} />
                    <div id="fiveBut">
                        <li id="oneBut">
                            <Link to="/add"><button>+<br />添加</button></Link>
                            <Link to="/add"><button>+<br />添加</button></Link>
                        </li>
                        <li id='twoBut'>
                            <Link to="/home"><button>家</button></Link>
                        </li>
                        <li id='twoBut'>
                            <Link to='/Robe'><button>衣柜</button></Link>
                        </li>
                        <li id='twoBut'>
                            <Link to='/trunk'><button>行李箱</button></Link>
                        </li>
                    </div>
                </div>

            </div>
        )
    }
}
