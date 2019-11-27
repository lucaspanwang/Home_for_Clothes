import React, { Component} from 'react';
import {Link} from 'react-router-dom'
import { NavBar} from 'antd-mobile';
import { Timeline} from 'antd';
import riji01 from './images/riji01.png';
import riji02 from './images/riji02.png';

export default class Diary extends Component {
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}>穿搭日记</NavBar>
                <div style={{marginLeft:"43%",width: '50px',height: '25px', backgroundColor: '#d6fbf0',borderRadius: '0 0 50px 50px ',marginBottom:'5px'}}>
                    <div style={{marginLeft:"20%",width: '30px',height: '15px', backgroundColor: '#91d5c7',borderRadius: '0 0 30px 30px '}}>    
                    </div>
                </div>
                <Timeline mode="alternate">
                    <Timeline.Item>
                        <p style={{backgroundColor:'#1aa389',borderRadius:'10px',textAlign:'center',width:'70%'}}>2019/10/26</p>
                        <Link to={'/detail'}>
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px'}}><img src={riji01} alt='' style={{width:'100%'}}/></div>
                        </Link>
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        <p style={{backgroundColor:'#1aa389',borderRadius:'10px',textAlign:'center',width:'70%',marginLeft:'30%'}}>2019/10/27</p>
                        <Link to={'/detail'}>
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px',marginLeft:'7%'}}><img src={riji02} alt='' style={{width:'100%'}}/></div>
                        </Link>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p style={{backgroundColor:'#1aa389',borderRadius:'10px',textAlign:'center',width:'70%'}}>2019/10/26</p>
                        <Link to={'/detail'}>
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px'}}><img src={riji01} alt='' style={{width:'100%'}}/></div>
                        </Link>
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                        <p style={{backgroundColor:'#1aa389',borderRadius:'10px',textAlign:'center',width:'70%',marginLeft:'30%'}}>2019/10/27</p>
                        <Link to={'/detail'}>
                            <div style={{width:'95%',padding:'10px',backgroundColor:'#c7e7c2',borderRadius:'10px',marginLeft:'7%'}}><img src={riji02} alt='' style={{width:'100%'}}/></div>
                        </Link>
                    </Timeline.Item>
                </Timeline>                
            </div>
            
        );
    }
}
