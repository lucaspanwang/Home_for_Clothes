import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import fanhui from './images/返回 (1).png'
export default class Chuanda extends Component {

    render() {
        return (
            <div style={{width:'100%'}}>
                    <NavBar 
                    style={{backgroundColor:'#fc9d9a',color:'white'}}
                    leftContent={[
                        <img src={fanhui} style={{width:'30px'}} key="fan"/>
                    ]}
                    >我的</NavBar>
            </div>
        );
    }
}
