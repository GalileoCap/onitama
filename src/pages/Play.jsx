import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Peer, Conn, connectTo } from '../peer';
import { useForceUpdate } from '../utils';

import Game from '../Game/Game';
import Chat from '../Chat/Chat';

function Connect() {
  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';
    connectTo(peerId);
  }

  return (
    <div className="Connect">
      <div onClick={() => navigator.clipboard.writeText(Peer.id)}>
        {Peer.id}
      </div>
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

function Share() {
  const onClick = () => {
    const link = window.location.origin + '/onitama/#/join/' + Peer.id; //TODO: Remove fixed path
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="Share">
      <button onClick={onClick}>
        Copy link to join
      </button>
    </div>
  )
}

function NoConn() {
  return <>
    <Connect />
    <Share />
  </>
}

function Connected() {
  return (
    <>
      <Game />
      <Chat />
    </>
  );
}

export function Play() {
  useForceUpdate('conn');

  return (
    <div className="Play">
      {
        Conn === undefined
        ? <NoConn /> 
        : <Connected />
      }
    </div>
  );
}
