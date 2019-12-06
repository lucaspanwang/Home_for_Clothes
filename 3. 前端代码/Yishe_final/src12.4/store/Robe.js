import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Robe extends Component {
    hrefChange(str){
        var h=window.location.href;
        var index = h.lastIndexOf("\/");  
        window.location.href = h.substring(0, index+1)+str;
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to="zhenglitab"><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>衣柜</NavBar>
            </div>
        )
    }
}
