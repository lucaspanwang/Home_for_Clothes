import React, { Component } from 'react'
import { Link,Route, BrowserRouter as Router } from 'react-router-dom';
import { NavBar} from 'antd-mobile';
import Back from '../images/返回 (1).png';
import './store.css';

export default class Add extends Component {
    render() {
        return (
            <div>
                <Router>
                    <NavBar
                        leftContent={
                            <Link to="/aaa"><img src={Back} style={{ width: '30px', height: "30px" }} /></Link>
                        }
                        style={{ backgroundColor: 'rgb(252, 157, 154)' }}>添加
                    </NavBar>
                    <h2 style={{margin:'5%',fontWeight:"lighter"}}>请输入你想要添加的空间名称:</h2>
                    <input type="type" style={{marginLeft:'5%',height:'30px'}}/>
                    <Link to="/aaa"><input type="submit" style={{height:'30px',width:'50px'}}/></Link>
                </Router>
            </div>
        )
    }
}
