import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushMsg } from './messagesSlice';
import { Peer, Conn, connectTo } from './peer';
import { useForceUpdate } from './utils';

function Connect() {
  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';
    connectTo(peerId);
  }

  return (
    <form onSubmit={onConnect}>
      <label>
        Peer ID:
      <input type="text" name="peerId" />
      </label>
      <input type="submit" value="Connect" />
    </form>
  );
}

function Messages() {
  const messages = useSelector((state) => state.messages.value);
  const dispatch = useDispatch();

  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value || 'ping'; textComponent.value = '';

    dispatch(pushMsg(text));
    Conn.send({type: 'msg', text});
  }

  return (
    <div>
      {messages.map((msg, i) => <p key={i}>> {msg}</p>)}

      <form onSubmit={onSend}>
        <input type="text" name="text" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
}

export default function App() {
  useForceUpdate('conn');

  return (
    <div className="App">
      <div onClick={() => navigator.clipboard.writeText(Peer.id)}>
        {Peer.id}
      </div>
      {
        Conn === undefined
        ? <Connect />
        : <Messages />
      }
    </div>
  );
}
