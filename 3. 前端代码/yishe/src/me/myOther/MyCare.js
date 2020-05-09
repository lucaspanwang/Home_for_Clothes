import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import UserModule from './common/UserModule';

import Back from '../../images/fanhui_1.png';

export default class MyCare extends Component {
    constructor(){
        super();
        this.state={
            care:[]
        }
    }
    componentWillMount(){
        fetch("http://47.98.163.228:3004/care?userId="+this.props.match.params.id)
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
                    leftContent={
                        <Link to={"/apptab/"+this.props.match.params.id+'&me'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                >关注</NavBar>
                <NavBar></NavBar>
                <div style={{margin:'10px'}}>
                    {
                        this.state.care.map((item,index)=>(
                            <UserModule userId={item.careId} key={index}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}
