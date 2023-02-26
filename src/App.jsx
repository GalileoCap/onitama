import React, { useState, useEffect } from 'react';

function useForceUpdate() {
  const [ val, setVal ] = useState(0);
  return () => setVal(val => val + 1);
}

function Connect({ peer, pushConn, pushMessage }) {
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

function Messages({ conns, messages, pushMessage }) {
  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value; textComponent.value = '';

    pushMessage(text);
    for (let conn of conns) {
      conn.send({text});
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

  const [ messages, setMessages ] = useState([]);
  const pushMessage = (msg) => {
    messages.push(msg); //setMessages([...messages, msg]);
    forceUpdate();
  }

  const [ conns, setConns ] = useState([]);
  const pushConn = (conn) => {
    conns.push(conn); //setConns([...conns, conn]);
    conn.on('data', (data) => {
      pushMessage(data.text);
    });

    pushMessage(conn.peer + ' joined');
    forceUpdate();
  }

  useEffect(() => {
    peer.on('connection', (conn) => pushConn(conn));
  }, []);

  return (
    <div className="App">
      {peer.id}
      {
        conns.length === 0
        ? <Connect peer={peer} pushConn={pushConn} pushMessage={pushMessage} />
        : <Messages messages={messages} conns={conns} pushMessage={pushMessage} />
      }

    </div>
  );
}
