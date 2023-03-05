import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PeerContext } from '../../peer';
import { useForceUpdate } from '../../utils';

import Chat from './Chat';
import { Board, Mine, Theirs, Extra } from './Game';
import './Play.css';

function Connect() {
  const { peer, connectTo } = useContext(PeerContext);

  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';
    connectTo(peerId);
  }

  return (
    <div className="Connect">
      <div onClick={() => navigator.clipboard.writeText(peer.id)}>
        {peer.id}
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

function Share({ game }) {
  const { peer } = useContext(PeerContext);

  const onClick = () => {
    const link = window.location.origin + '/onitama/#/' + game + '/join/' + peer.id; //TODO: Remove fixed path
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

function NoConn({ game }) {
  return <>
    <Connect />
    <Share game={game} />
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
  const { conn } = useContext(PeerContext);
  const { game } = useParams();

  return (
    <div className="Play">
      {
        conn === null
        ? <NoConn game={game} /> 
        : <Connected game={game} />
      }
    </div>
  );
}
