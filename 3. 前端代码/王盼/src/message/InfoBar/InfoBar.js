import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';
import fanhui from '../../images/返回 (1).png';
import { NavBar } from 'antd-mobile';

import './InfoBar.css';

const InfoBar = ({room}) => (
  <NavBar 
    style={{backgroundColor:'#fc9d9a',color:'white'}}
    leftContent={[
        // <Link to="/"><img src={fanhui} style={{width:'25%'}} key="fan"/></Link>
        <a href='/'><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
    ]}
    >{room}
  </NavBar>

);

export default InfoBar;