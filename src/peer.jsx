import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { setOrder, theirMove } from './gameSlice';
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
  const conn = Peer.connect(peerId, {
    metadata: {
      rolls: {mine: Math.random(), theirs: Math.random() },
    },
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
  else store.dispatch(setOrder({rolls: conn.metadata.rolls, useMine}));

  store.dispatch(pushMsg(conn.peer + ' joined'));
  store.dispatch(forceUpdate('conn'));
}
