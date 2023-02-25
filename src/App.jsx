import React, { useState, useEffect } from 'react';

export default function App({ peer }) {
  const [ conns, setConns ] = useState([]);
  const pushConn = (conn) => {
    const newConns = [...conns];
    newConns.push(conn);
    setConns(newConns);
  }

  const [ messages, setMessages ] = useState([]);
  const pushMessage = (msg) => {
    const newMessages = [...messages];
    newMessages.push(msg);
    setMessages(newMessages);
  }

  const onConnect = (ev) => {
    ev.preventDefault();
    const peerId = ev.target.querySelector('input[name="peerId"]').value;
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
    const text = ev.target.querySelector('input[name="text"]').value;
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

      {messages.map(msg => <p>> {msg}</p>)}

      <form onSubmit={onSend}>
        <input type="text" name="text" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
}
