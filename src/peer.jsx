import { Peer as PeerJS } from 'peerjs';

import store from './store';
import { pushMsg } from './messagesSlice';
import { forceUpdate } from './utils';

export let Peer = undefined;
export let Conn = undefined;

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
  Conn.on('data', (data) => {
    switch (data.type) {
    case 'init':
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
  }), 0); //TODO: This tries to fix a race condition where the peer who connected hasn't set the callback (conn.on('data')) yet.

  store.dispatch(pushMsg(conn.peer + ' joined'));
  store.dispatch(forceUpdate('conn'));
}
