import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { initGame, theirMove, MOVES } from './Game/gameSlice';
import { pushMsg } from './messagesSlice';
import { forceUpdate } from './utils';

export let Peer = undefined;
export let Conn = undefined;

export function initPeer() {
  Peer = new PeerJS();
  Peer.on('connection', (conn) => {
    if (Conn === undefined) setConn(conn, false);
    else conn.close();
  });
  Peer.on('open', () => store.dispatch(forceUpdate('peer')));
}

export function connectTo(peerId) {
  const rolls = {mine: Math.random(), theirs: Math.random()};
  const shuffledMoves = MOVES.sort((a, b) => 0.5 - Math.random());
  const moves = {
    mine: [shuffledMoves[0], shuffledMoves[1]],
    theirs: [shuffledMoves[2], shuffledMoves[3]],
    middle: shuffledMoves[4],
  };

  const conn = Peer.connect(peerId, {
    metadata: {rolls, moves},
  });
  conn.on('open', () => setConn(conn, true));
}

export function setConn(conn, useMine) {
  Conn = conn;
  Conn.on('data', (data) => {
    switch (data.type) {
    case 'move':
      store.dispatch(theirMove(data));
      break;

    case 'msg':
      store.dispatch(pushMsg(data.text));
      break;

    default:
      console.log('default', data);
    }
  });

  console.log('Rolls:', conn.metadata.rolls);
  if (conn.metadata.rolls.mine === conn.metadata.rolls.theirs) console.log('TODO: Reroll');
  else store.dispatch(initGame({
    rolls: conn.metadata.rolls, useMine,
    moves: conn.metadata.moves,
  }));

  store.dispatch(pushMsg(conn.peer + ' joined'));
  store.dispatch(forceUpdate('conn'));
}
