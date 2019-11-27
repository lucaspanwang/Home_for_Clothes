import React, { Component } from 'react';
import { Popover, NavBar, WingBlank,WhiteSpace } from 'antd-mobile';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import ShequIndex from './shequ/ShequIndex';
import ShequArticle from './shequ/ShequArticle';

import fanhui from './images/返回 (1).png';

export default class Shequ extends Component {
    render() {
        return (
            <div style={{width:'100%'}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <img src={fanhui} style={{width:'30px'}} key="fan"/>
                ]}
                >社区</NavBar>

                <Router>
                    <Route exact path='/' component={ShequIndex}/>
                    <Route path='/shequindex' component={ShequIndex}/>
                    <Route path='/shequarticle' component={ShequArticle}/>
                </Router>
            </div>
        );
    }
}