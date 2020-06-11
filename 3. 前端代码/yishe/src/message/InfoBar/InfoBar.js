import React, {useState, useEffect} from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';
import fanhui from '../../images/fanhui_1.png';
import { NavBar } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

import './InfoBar.css';

const InfoBar = ({name, room}) => {

  const [roomName, setRoomName] = useState('');

  const onback=()=>{
    // console.log(this.props.history.location);
    window.history.go(-1);
  }

  useEffect(() => {
    if(room.indexOf('group')!==-1){
      setRoomName('内测用户体验群');
    }else{
      var userId='';
      var user1= room.split("?")[0];
      var user2= room.split("?")[1];
      if(user1==name) userId=user2;else userId=user1;
      if(userId!=null) fetch("http://47.98.163.228:3004/users?userId="+userId)
        .then(res=>res.json())
        .then(res=>{
            setRoomName(res[0].userName);
        });
    }
  });
  
  return(
  <NavBar 
    style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
    leftContent={[
      <Link to={`/apptab/${name}&message`}>
        <img src={fanhui} style={{width:'25%'}} key="fan"/>
      </Link>
        //<a href='/apptab'><img src={fanhui} style={{width:'25%'}} key="fan"/></a>
    ]}
    >{roomName}
  </NavBar>
  );}

export default InfoBar;