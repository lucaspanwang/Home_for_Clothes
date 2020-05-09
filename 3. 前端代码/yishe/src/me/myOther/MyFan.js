import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar } from 'antd-mobile';

import Back from '../../images/fanhui_1.png';
import yonghu from '../../images/yonghu.png';
import chengshi from '../../images/chengshi.png';
import xingbie from '../../images/xingbie.png';
import jianjie from '../../images/jianjie.png';
import shoucang from '../../images/shoucang.png';
import pinglun from '../../images/pinglun.png';
import dianzan from '../../images/dianzan.png';
import Gongge from '../../community/common/Gongge';
import UserModule from './common/UserModule';

export default class MyFan extends Component {
    constructor(){
        super();
        this.state={
            care:[]
        }
    }
    componentWillMount(){
        fetch("http://47.98.163.228:3004/care?careId="+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                care:res
            })
        })
    }
    render() {
        return (
            <div>
                <NavBar
                style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                leftContent={<Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>}
                >粉丝</NavBar>
                <NavBar></NavBar>
                <div style={{margin:'10px'}}>
                    {
                        this.state.care.map((item,index)=>(
                            <UserModule userId={item.userId} key={index}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}
