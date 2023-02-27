import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushMsg } from './messagesSlice';

function useForceUpdate() {
  const [ val, setVal ] = useState(0);
  return () => setVal(val => val + 1);
}

function Connect({ peer, pushConn }) {
  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';

    const conn = peer.connect(peerId);
    conn.on('open', () => pushConn(conn));
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

function Messages({ conns }) {
  const messages = useSelector((state) => state.messages.value);
  const dispatch = useDispatch();

  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value || 'ping'; textComponent.value = '';

    dispatch(pushMsg(text));
    for (let conn of conns) {
      conn.send({type: 'msg', text});
    }
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

export default function App({ peer }) {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const [ conns, setConns ] = useState([]);
  const pushConn = (conn) => {
    conns.push(conn); //setConns([...conns, conn]);
    conn.on('data', (data) => {
      switch (data.type) {
      case 'peers':
        for (let peerId of data.peers) {
          if (peerId != peer.id && (conns.filter(conn => conn.peer === peerId).length === 0)) { // It's not me nor am I already connected to them
            const conn = peer.connect(peerId);
            conn.on('open', () => pushConn(conn));
          }
        }
        break;

      case 'msg':
        dispatch(pushMsg(data.text));
        break;

      default:
        console.log('default', data);
      }
    });
    setTimeout(() => conn.send({type: 'peers', peers: conns.map(conn => conn.peer)}), 0); //TODO: This tries to fix a race condition where the peer who connected hasn't set the callback (conn.on('data')) yet.

    dispatch(pushMsg(conn.peer + ' joined'));
    forceUpdate();
  }

  useEffect(() => {
    peer.on('connection', (conn) => pushConn(conn));
  }, []);

  return (
    <div className="App">
      <div onClick={() => navigator.clipboard.writeText(peer.id)}>
        {peer.id}
      </div>
      {
        conns.length === 0
        ? <Connect peer={peer} pushConn={pushConn} />
        : <Messages conns={conns} />
      }
    </div>
  );
}
