import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Conn, connectTo } from '../peer';
import { useForceUpdate } from '../utils';

export function Join() {
  useForceUpdate('conn');

  const navigate = useNavigate();
  const { peerId } = useParams();
  useEffect(() => {
    console.log(peerId);
    if (Conn === undefined) connectTo(peerId);
    else navigate('/play'); //TODO: Remove fixed path
  }, []);

  if (Conn !== undefined) navigate('/play'); //TODO: Remove fixed path

  return (
    <div className="Join">
      Joining game...
    </div>
  );
}
