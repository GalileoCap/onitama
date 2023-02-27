import { Peer as PeerJS } from 'peerjs';
import store from './store';
import { pushMsg } from './messagesSlice';

export let Peer = null;
export const Conns = [];

export function initPeer() {
  Peer = new PeerJS();
  Peer.on('connection', (conn) => pushConn(conn));
  //Peer.on('open', cb);
}

export function connectTo(peerId, cb = () => {}) {
  const conn = Peer.connect(peerId);
  conn.on('open', () => pushConn(conn, cb));
}

export function send2Conns(data) {
  Conns.forEach((conn) => conn.send(data));
}

export function pushConn(conn, cb = () => {}) {
  Conns.push(conn);
  conn.on('data', (data) => {
    switch (data.type) {
    case 'peers':
      for (let peerId of data.peers) {
        if (peerId != Peer.id && (Conns.filter(conn => conn.peer === peerId).length === 0)) { // It's not me nor am I already connected to them
          const conn = Peer.connect(peerId);
          conn.on('open', () => pushConn(conn));
        }
      }
      break;

    case 'msg':
      store.dispatch(pushMsg(data.text));
      break;

    default:
      console.log('default', data);
    }
  });
  setTimeout(() => conn.send({type: 'peers', peers: Conns.map(conn => conn.peer)}), 0); //TODO: This tries to fix a race condition where the peer who connected hasn't set the callback (conn.on('data')) yet.

  store.dispatch(pushMsg(conn.peer + ' joined'));
  cb();
}
