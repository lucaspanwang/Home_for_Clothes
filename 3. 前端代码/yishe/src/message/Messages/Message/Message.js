import React, {useEffect, useState} from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name, emotion, setEmotion}) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  let [userPic,setUserPic] = useState('');
  let [userInfor,setUserInfor] = useState({});

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  useEffect(() => {
    if(text.indexOf('不好意思')!=-1 || text.indexOf('嘻嘻')!=-1 || text.indexOf('不客气')!=-1 || text.indexOf('怎么好意思')!=-1 || text.indexOf('羞')!=-1){setEmotion('blush');setEmotion('blush')}
    else if(text.indexOf('真棒')!=-1 || text.indexOf('鼓掌')!=-1 || text.indexOf('太棒')!=-1 || text.indexOf('厉害')!=-1 || text.indexOf('TQL')!=-1 || text.indexOf('太强了')!=-1 || text.indexOf('很强')!=-1 || text.indexOf('优秀')!=-1 || text.indexOf('出色')!=-1 || text.indexOf('加油')!=-1 || text.indexOf('恭喜')!=-1){setEmotion('great')}
    else if(text.indexOf('哈哈')!=-1 || text.indexOf('啦啦')!=-1 || text.indexOf('开心')!=-1 || text.indexOf('快乐')!=-1 || text.indexOf('高兴')!=-1 || text.indexOf('hh')!=-1 || text.indexOf('233')!=-1 || text.indexOf('开心')!=-1 || text.indexOf(':)')!=-1 || text.indexOf(':D')!=-1 || text.indexOf('smile')!=-1 || text.indexOf(':p')!=-1){setEmotion('joy')}
    else if(text.indexOf('难过')!=-1 || text.indexOf('失望')!=-1 || text.indexOf('难受')!=-1 || text.indexOf('蓝瘦')!=-1 || text.indexOf('想哭')!=-1 || text.indexOf('555')!=-1 || text.indexOf('绝望')!=-1 || text.indexOf(":'(")!=-1 || text.indexOf(':[')!=-1 || text.indexOf(':(')!=-1 || text.indexOf('%)')!=-1){setEmotion('sad')}
    else setEmotion('');
    fetch("http://47.98.163.228:3000/users?userId="+user)
        .then(res=>res.json())
        .then(res=>{
            for(var i=0;i<res.length;i++){
                var j = res[i].userPic.indexOf('/');
                setUserPic("http://47.98.163.228:3000"+res[i].userPic.substr(j));
            };
        });
  });

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{trimmedName}</p> */}
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          &nbsp;&nbsp;
          <img src={userPic} alt="" style={{float:"left",width:"15%", height:'15%', borderRadius:"50%"}}/>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <img src={userPic} alt="" style={{float:"left",width:"15%", height:'15%', borderRadius:"50%",marginRight:"3%"}}/>
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            {/* <p className="sentText pl-10 ">{user}</p> */}
          </div>
        )
  );
}

export default Message;