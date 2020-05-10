import React from 'react';

import './Input.css';

import emoji from '../../images/message/emoji.png';
import voice from '../../images/message/voice.png';
import add from '../../images/message/add.png';

const Input = ({ setMessage, sendMessage, message }) => {
  let defaultHeight = '18%';
  let secondHeight= '80%';

  return(
    <form className="form">
      <img id="voice" src={voice}/>
      <input
        id="input"
        type="text"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <img
        id="emoji"
        src={emoji}
        />
      <img id="add" src={add}/>
    </form>
  );
}

export default Input;