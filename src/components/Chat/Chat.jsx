import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushMsg } from './chatSlice';
import { Conn } from '../../peer';
import './Chat.css';

function Message({ data }) {
  return (
    <div className="MessageComponent">
      <span className={'Msg' + (data.mine ? ' Mine' : ' Theirs')}>
        {data.text}
      </span>
    </div>
  );
}

function BottomMessage() {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView();
  });

  return <span ref={divRef} />;
}

function Messages() {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <div className="MessagesComponent">
      { messages.map((msg, i) => <Message data={msg} key={i} />) }
      <BottomMessage />
    </div>
  );
}

export function SendMessage() {
  const dispatch = useDispatch();

  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value || 'ping'; textComponent.value = '';

    dispatch(pushMsg({mine: true, text}));
    Conn.send({type: 'msg', text});
  }

  return (
    <div className="SendMessageComponent">
      <form onSubmit={onSend}>
        <input type="text" name="text" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
}

export function Chat() {
  return (
    <div className="ChatComponent">
      <Messages />
      <SendMessage />
    </div>
  );
}
