import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../../images/fanhui_1.png';
import CitySelector from '../../login/CitySelector';
import {Consumer} from '../../context'
export default class City extends Component {
    handlePost =(data)=> { 
        fetch('http://47.98.163.228:3000/changeCity',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            // credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            body:JSON.stringify({city:data.userCity,userId:this.props.match.params.id}) 
        })
    }
    render() {
        return (
            <Consumer>
                {
                (data)=>{return <div>
                    <NavBar
                    style={{backgroundColor:'#fc9d9a',color:'white',marginBottom:'10px'}}
                    leftContent={[
                        <Link to={"/aboutme/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan852"/></Link>
                    ]}
                    rightContent={[
                        <Link to={"/aboutme/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={()=>this.handlePost(data)}>完成</Link>
                    ]}
                    >更改城市</NavBar>
                    <CitySelector />
                    </div>}
                }
            </Consumer>
        )
    }
}
