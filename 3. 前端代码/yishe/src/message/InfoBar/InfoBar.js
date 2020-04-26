import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';
import fanhui from '../../images/fanhui_1.png';
import { NavBar } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

import './InfoBar.css';

const InfoBar = ({name, room}) => (
  <NavBar 
    style={{backgroundColor:'#fc9d9a',color:'white'}}
    leftContent={[
      <Link to={`/apptab/${name}&message`}>
        <img src={fanhui} style={{width:'25%'}} key="fan"/>
      </Link>
        //<a href='/apptab'><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
    ]}
    >衣舍内测用户体验群1群
  </NavBar>//{room}

);

export default InfoBar;