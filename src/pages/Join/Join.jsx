import { useEffect, useContext } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { PeerContext } from '../../peer';

export function Join() {
  const { conn, connectTo } = useContext(PeerContext);
  const { getMetadata } = useOutletContext();

  const navigate = useNavigate();
  const { game, peerId } = useParams();
  useEffect(() => {
    if (conn === null) connectTo(peerId, getMetadata());
    else navigate('/' + game + '/play'); //TODO: Remove fixed path
  }, [conn]);

  return (
    <div id="Join">
      Joining game... { /* TODO: Animation */ }
    </div>
  );
}

/*
 * TODO:
 *  - Warn on errors/reject/timeout
 */
