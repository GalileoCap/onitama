import React, { useState, useEffect } from 'react';

function useForceUpdate() {
  const [ val, setVal ] = useState(0);
  return () => setVal(val => val + 1);
}

export default function App({ peer }) {
  const forceUpdate = useForceUpdate();

  const [ conns, setConns ] = useState([]);
  const pushConn = (conn) => {
    conns.push(conn); //setConns([...conns, conn]);
    forceUpdate();
  }

  const [ messages, setMessages ] = useState([]);
  const pushMessage = (msg) => {
    messages.push(msg); //setMessages([...messages, msg]);
    forceUpdate();
  }

  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';

    const conn = peer.connect(peerId);
    conn.on('open', () => {
      pushConn(conn);
      conn.on('data', (data) => {
        pushMessage(data.text);
      });
    })
  }

  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value; textComponent.value = '';

    pushMessage(text);
    for (let conn of conns) {
      conn.send({text});
    }
  }

  useEffect(() => {
    peer.on('connection', (conn) => {
      pushConn(conn);
      conn.on('data', (data) => {
        pushMessage(data.text);
      });
    })
  }, []);

  return (
    <div className="App">
      {peer.id}
      <form onSubmit={onConnect}>
        <label>
          Peer ID:
          <input type="text" name="peerId" />
        </label>
        <input type="submit" value="Connect" />
      </form>

      {messages.map((msg, i) => <p key={i}>> {msg}</p>)}

      <form onSubmit={onSend}>
        <input type="text" name="text" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
}
