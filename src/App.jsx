import React, { useState, useEffect } from 'react';

export default function App({ peer }) {
  const [ conns, setConns ] = useState([]);
  const pushConn = (conn) => {
    const newConns = [...conns];
    newConns.push(conn);
    setConns(newConns);
  }
  useEffect(() => {
    peer.on('connection', (conn) => {
      pushConn(conn);
      conn.on('data', (data) => console.log(data));
    })
  }, []);

  const onConnect = (ev) => {
    ev.preventDefault();
    const peerId = ev.target.querySelector('input[name="peerId"]').value;
    console.log('connect to:', peerId);
    const conn = peer.connect(peerId);
    conn.on('open', () => {
      console.log('connected');
      pushConn(conn);
    })
  }

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
    </div>
  );
}
