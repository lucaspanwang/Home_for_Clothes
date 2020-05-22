import React, {useState, useEffect} from 'react';

import './Input.css';

import emoji from '../../images/message/emoji.png';
import emoji2 from '../../images/message/emoji2.png';
import voice from '../../images/message/voice.png';
import add from '../../images/message/add.png';
import ReactEmoji from 'react-emoji';

const Input = ({ setMessage, sendMessage, message }) => {
  let [status, setStatus] = useState('0');
  let [bottom, setBottom] = useState('18%');
  let [iemoji,setIemoji] = useState(emoji);

  useEffect(() => {
    if(status=='0')
    {
      setBottom('18%');
      setIemoji(emoji);
    }
    else
    {
      setBottom('80%');
      setIemoji(emoji2);
    }
});

  return(
    <form
      className="form"
      style={{paddingBottom:`${bottom}`}}
      >
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
        src={iemoji}
        onClick={()=>{setStatus(1^status);console.log(status);}}
        />
      <img id="add"
        src={add}
        />
        <ul id="myEmoji">
          <li>
            <div className="emojiButton">{ReactEmoji.emojify(':)')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':(')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':D')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(';)')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':O')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':p')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':smile:')}</div>
            <div className="emojiButton">{ReactEmoji.emojify(':@')}</div>
          </li>
        </ul>
        
    </form>
  );
}

export default Input;