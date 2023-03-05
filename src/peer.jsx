import { createContext, useState, useEffect } from 'react';
import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { pushMsg } from './components/Chat';
import { gameMsg } from './components/GameWrapper';

let Peer = null;
let Conn = null;

export const PeerContext = createContext(null);
export function PeerProvider({ children }) {
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    // Init peer
    Peer = new PeerJS();
    Peer.on('open', () => setPeer(Peer));
    Peer.on('connection', (newConn) => initConn(newConn, false, setConn));
    Peer.on('disconneted', () => {
      console.log('Peer disconneted')
      //TODO: Handle reconnect
    });
    Peer.on('close', () => {
      console.log('Peer close');
      setPeer(null);
      Peer = null;
      //TODO: Reopen
    });
    Peer.on('error', (err) => {
      console.error('Peer error:', err);
      setPeer(null);
      Peer = null;
      //TODO: Handle/close
    });
  }, []);

  return (
    <PeerContext.Provider value={{
      peer, conn,
      connectTo: (peerId, metadata) => connectTo(peerId, metadata, setConn),
    }}>
      {
        peer !== null
        ? children
        : <>Loading...</>
      }
    </PeerContext.Provider>
  );
}

function initConn(conn, useMine, setConn) {
  if (Conn !== null) {
    conn.close();
    return;
  }

  conn.metadata.useMine = useMine;
  conn.on('data', (data) => {
    switch (data.type) {
    case 'game':
      gameMsg(data);
      break;

    case 'msg':
      store.dispatch(pushMsg({mine: false, text: data.text}));
      break;

    default:
      console.error('Unhandled message', data);
    }
  });
  conn.on('close', () => {
    console.log('Connection closed');
    setConn(null);
    Conn = null;
    //TODO: Handle, wait for reconnect
  })
  conn.on('error', (err) => {
    console.error('Connection error:', err);
    //TODO: Handle, warn/close game
  })

  Conn = conn;
  setConn(Conn);
}

function connectTo(peerId, metadata, setConn) {
  if (Conn !== null) {
    return;
  }

  const conn = Peer.connect(peerId, {metadata});
  conn.on('open', () => initConn(conn, true, setConn));
}

export function send2Conn(data) {
  if (Conn === null) {
    console.error('No connection');
    return;
  }

  Conn.send(data);
}
