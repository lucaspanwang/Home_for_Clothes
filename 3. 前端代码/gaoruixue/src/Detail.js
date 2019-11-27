import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import fanhui from './images/返回 (1).png';
import riji01 from './images/riji01.png';
import { AutoComplete } from 'antd';

export default class Chuanda extends Component {

    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                    style={{backgroundColor:'#fc9d9a',color:'white'}}
                    leftContent={[
                        <img src={fanhui} style={{width:'30px'}} key="fan"/>
                    ]}
                    >穿搭日记</NavBar>
                <p style={{backgroundColor:'#96cec3',borderRadius:'0 15px 0 15px',textAlign:'center',width:'40%',marginTop:'20px',transform:'skew(20deg,20deg)',transform:'rotate(-10deg)'}}>2019/10/26</p>
                <div style={{width:'90%',padding:'10px',backgroundColor:'#c5e6e0',borderRadius:'10px',margin:'auto'}}>
                    <img src={riji01} alt='' style={{width:'100%'}}/>
                    <p style={{color:'#1f8774',marginTop:'8px'}}>今天和朋友一起穿着新衣服去逛街，很开心，希望每天都可以开开心心的！</p>
                </div>     
            </div>
        );
    }
}
