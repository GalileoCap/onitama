import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { setOrder, selectCell } from './gameSlice';
import { pushMsg } from './messagesSlice';
import { forceUpdate } from './utils';

export let Peer = undefined;
export let Conn = undefined;
export let MyRoll = undefined;

export function initPeer() {
  Peer = new PeerJS();
  Peer.on('connection', (conn) => {
    if (Conn === undefined) setConn(conn);
    else conn.close();
  });
  Peer.on('open', () => store.dispatch(forceUpdate('peer')));
}

export function connectTo(peerId) {
  const conn = Peer.connect(peerId);
  conn.on('open', () => setConn(conn));
}

export function setConn(conn) {
  Conn = conn;
  MyRoll = Math.random();
  Conn.on('data', (data) => {
    switch (data.type) {
    case 'init':
      //TODO: SECURITY: Block incoming inits after first one
      if (data.roll == MyRoll) console.log('Retry'); //TODO: Retry
      else store.dispatch(setOrder({mine: MyRoll, theirs: data.roll}));
      break;

    case 'move':
      store.dispatch(selectCell(data.cell));
      break;

    case 'msg':
      store.dispatch(pushMsg(data.text));
      break;

    default:
      console.log('default', data);
    }
  });
  setTimeout(() => conn.send({
    type: 'init',
    roll: MyRoll,
  }), 0); //TODO: This tries to fix a race condition where the peer who connected hasn't set the callback (conn.on('data')) yet.

  store.dispatch(pushMsg(conn.peer + ' joined'));
  store.dispatch(forceUpdate('conn'));
}
