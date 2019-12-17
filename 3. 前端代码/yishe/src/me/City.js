import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import CitySelector from '../login/CitySelector';
import {Consumer} from '../context'
export default class City extends Component {
    handlePost = (data) => {
        var InputValue = data.userCity;
        console.log(InputValue,'------InputValue');
        localStorage.setItem('newCity',InputValue)
        window.location.href = "/#/aboutme/"+this.props.match.params.id
    }
    render() {
        return (
            <Consumer>
                {
                (data)=>{return <div>
                    <NavBar
                    style={{backgroundColor:'#fc9d9a',color:'white',marginBottom:'10px'}}
                    leftContent={[
                        <Link to={"/aboutme/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                    ]}
                    rightContent={[
                        <p style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px',marginTop:'18%'}} onClick={()=>this.handlePost(data)}>完成</p>
                    ]}
                    >更改城市</NavBar>
                    <CitySelector />
                    </div>}
                }
            </Consumer>
        )
    }
}
