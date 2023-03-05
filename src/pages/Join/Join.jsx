import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PeerContext } from '../../peer';

export function Join() {
  const { conn, connectTo } = useContext(PeerContext);

  const navigate = useNavigate();
  const { game, peerId } = useParams();
  useEffect(() => {
    if (conn === null) connectTo(peerId);
    else navigate('/' + game + '/play'); //TODO: Remove fixed path
  }, [conn]);

  return (
    <div id="Join">
      Joining game...
    </div>
  );
}

/*
 * TODO:
 *  - Warn on errors/reject
 */
