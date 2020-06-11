import React, {useState, useEffect} from 'react';
import ReactEmoji from 'react-emoji';

const Friend = ({userId, lastWord, date}) => {
    let [user, setUser] = useState({});

    useEffect(()=>{
        fetch("http://47.98.163.228:3004/users?userId="+userId)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                res[i].userPic = "http://47.98.163.228:3004"+res[i].userPic.substr(j);
            }
            setUser(res[0]);
        });
    });

    return(<li style={{position:'relative', marginBottom:'0%', lineHeight:'30px', fontSize:'18px'}}>
        <img src={user.userPic} width="16%" style={{marginBottom:'6%' ,borderRadius:'100%'}}/>
        <div style={{width:'80%', marginLeft:'4%', borderBottom:'solid 1px #cccccc', display:'inline-block', fontSize:'18px', paddingLeft:'2%', paddingBottom:'4%', color:'black'}}>
            {user.userName}
        <p style={{fontSize:'15px', color:'#a8a8a8', float:'right', marginTop:'0', marginRight:'2%'}}>{date}</p>
        <p style={{color:'#666666', margin:'0', fontSize:'16px'}}>{ReactEmoji.emojify(lastWord)}</p>
        </div>
    </li>);
}

export default Friend;