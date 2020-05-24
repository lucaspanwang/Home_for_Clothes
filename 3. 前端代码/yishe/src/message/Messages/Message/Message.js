import React, {useEffect} from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  // let userPic='http://47.98.163.228/我的/images/123.jpg';

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // useEffect(() => {
  //   fetch("http://47.98.163.228:3000/users?userId="+trimmedName)
  //       .then(res=>res.json())
  //       .then(res=>{
  //           for(var i=0;i<res.length;i++){
  //               var j = res[i].userPic.indexOf('/');
  //               userPic = "http://47.98.163.228:3000"+res[i].userPic.substr(j);
  //           }
  //       });
  // });

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{trimmedName}</p> */}
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            {/* <img src={userPic} alt="" style={{float:"left",width:"20%",borderRadius:"50%",marginRight:"3%"}}/> */}
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;