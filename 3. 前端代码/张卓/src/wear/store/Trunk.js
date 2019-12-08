import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/返回 (1).png';

export default class Trunk extends Component {
    hrefChange(str){
        var h=window.location.href;
        var index = h.lastIndexOf("\/");  
        window.location.href = h.substring(0, index+1)+'str';
    }
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8084/trunk',
            picture:[]
        }
    }
    componentDidMount(){
        fetch(this.state.url)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                picture:res
            })
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    leftContent={
                        <Link to="/zhenglitab"><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>行李箱</NavBar>
                <div>
                    {
                    this.state.picture.map((item,i)=>(<img src={`http://47.98.163.228:8084/${item}`} style={{width:'120px',height:'120px',margin:'2px'}}/>))
                    }
                </div>
            </div>
        )
    }
}
