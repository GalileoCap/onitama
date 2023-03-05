import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { initGame, theirMove, MOVES } from './games/onitama/gameSlice';
import { initGame as TTTinitGame, theirMove as TTTtheirMove } from './games/tiictaactooee/gameSlice';
import { pushMsg } from './components/Chat';

import { createContext, useState, useEffect } from 'react';

let isConnected = false; // To prevent multiple connections //TODO: Remove

export const PeerContext = createContext(null);
export function PeerProvider({ children }) {
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    // Init peer
    const peer = new PeerJS();
    peer.on('open', () => setPeer(peer));
    peer.on('connection', (newConn) => {
      if (isConnected) newConn.close();
      else initConn(newConn, false, setConn);
    });

    peer.on('disconneted', () => {
      console.log('Peer disconneted')
      //TODO: Handle reconnect
    });
    peer.on('close', () => {
      console.log('Peer close');
      setPeer(null);
      //TODO: Reopen
    });
    peer.on('error', (err) => {
      console.error('Peer error:', err);
      setPeer(null);
      //TODO: Handle/close
    });
  }, []);

  return (
    <PeerContext.Provider value={{
      peer, conn,
      connectTo: (peerId) => connectTo(peerId, peer, setConn),
    }}>
      {
        peer 
        ? children
        : <>Loading...</>
      }
    </PeerContext.Provider>
  );
}

function initConn(conn, useMine, setConn) {
  conn.on('data', (data) => {
    switch (data.type) {
    case 'move':
      //store.dispatch(theirMove(data));
      store.dispatch(TTTtheirMove(data));
      break;

    case 'msg':
      store.dispatch(pushMsg({mine: false, text: data.text}));
      break;

    default:
      console.log('default', data);
    }
  });
  conn.on('close', () => {
    console.log('Connection closed');
    setConn(null);
    //TODO: Handle, wait for reconnect
  })
  conn.on('error', (err) => {
    console.error('Connection error:', err);
    //TODO: Handle, warn/close game
  })

  if (conn.metadata.rolls.mine === conn.metadata.rolls.theirs) console.log('TODO: Reroll');
  else store.dispatch(TTTinitGame({
    rolls: conn.metadata.rolls, useMine,
  }));
  //else store.dispatch(initGame({
    //rolls: conn.metadata.rolls, useMine,
    //moves: conn.metadata.moves,
  //}));

  //store.dispatch(pushMsg(Conn.peer + ' joined'));

  send2Conn = (data) => conn.send(data);
  isConnected = true;
  setConn(conn);
}

function connectTo(peerId, peer, setConn) {
  // TODO: Game specific
  const rolls = {mine: Math.random(), theirs: Math.random()};
  const shuffledMoves = MOVES.sort((a, b) => 0.5 - Math.random());
  const moves = {
    mine: [shuffledMoves[0], shuffledMoves[1]],
    theirs: [shuffledMoves[2], shuffledMoves[3]],
    middle: shuffledMoves[4],
  };

  const conn = peer.connect(peerId, {
    metadata: {rolls, moves},
  });
  conn.on('open', () => initConn(conn, true, setConn));
}

export let send2Conn = () => console.error('NO CONNECTION YET');
