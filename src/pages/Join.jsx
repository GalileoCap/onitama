import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Conn, connectTo } from '../peer';
import { useForceUpdate } from '../utils';

export function Join() {
  useForceUpdate('conn');

  const navigate = useNavigate();
  const { game, peerId } = useParams();
  useEffect(() => {
    if (Conn === undefined) connectTo(peerId);
    else navigate('/' + game + '/play'); //TODO: Remove fixed path
  });

  return (
    <div className="Join">
      Joining game...
    </div>
  );
}
