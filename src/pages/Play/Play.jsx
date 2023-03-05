import { useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import store from '../../store';
import { PeerContext } from '../../peer';

import Chat from './Chat';
import { Board, Mine, Theirs, Extra } from './Game';
import './Play.css';

function Connect() {
  const { peer, connectTo } = useContext(PeerContext);
  const { getMetadata } = useOutletContext();

  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';
    connectTo(peerId, getMetadata());
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

function Share() {
  const { peer } = useContext(PeerContext);
  const { game } = useOutletContext();

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

function NoConn() {
  return <>
    <Connect />
    <Share />
  </>
}

function Connected() {
  const { conn } = useContext(PeerContext);
  const { initGame } = useOutletContext();

  useEffect(() => {
    store.dispatch(initGame(conn.metadata));
  }, [initGame, conn]);

  return (
    <>
      <div className="Title Section">Title</div>
      <div className="Info Section">Info</div>
      <Chat />
      <Extra />
      <div className="Actions Section">Actions</div>
      <Theirs />
      <Board />
      <Mine />
    </>
  );
}

export function Play() {
  const { conn } = useContext(PeerContext);

  return (
    <div className="Play">
      {
        conn === null
        ? <NoConn /> 
        : <Connected />
      }
    </div>
  );
}
