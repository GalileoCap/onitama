import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Peer, Conn, connectTo } from '../../peer';
import { useForceUpdate } from '../../utils';

//import Game from '../Game/Game'; //TODO

import Chat from './Chat';
import { Board, Mine, Theirs, Extra } from './Game';
import './Play.css';

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

function Connected({ game }) {
  return (
    <>
      <div className="Title Section">Title</div>
      <div className="Info Section">Info</div>
      <Chat />
      <Extra game={game} />
      <div className="Actions Section">Actions</div>
      <Theirs game={game} />
      <Board game={game} />
      <Mine game={game} />
    </>
  );
}

export function Play() {
  useForceUpdate('conn');
  const { game } = useParams();

  return (
    <div className="Play">
      {
        Conn === undefined
        ? <NoConn /> 
        : <Connected game={game} />
      }
    </div>
  );
}
