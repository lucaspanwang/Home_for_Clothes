import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import styles from"./Chat.css";

// import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('0');
  const [gender, setGender] = useState('');
  const [emotion, setEmotion] = useState('');
  const ENDPOINT = 'http://47.98.163.228:3006/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    fetch("http://47.98.163.228:3000/users?userId="+name)
        .then(res=>res.json())
        .then(res=>{
          setGender(res[0].userSex);
        });

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
      <div className="container">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <InfoBar name={name} room={room} />
          <Messages messages={messages} name={name} emotion={emotion} setEmotion={setEmotion}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} status={status} setStatus={setStatus} gender={gender} emotion={emotion} setEmotion={setEmotion}/>
      </div>
      // <TextContainer users={users}/>
  );
}

export default Chat;