import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Conn, connectTo } from '../peer';
import { useForceUpdate } from '../utils';

export function Join() {
  useForceUpdate('conn');

  const navigate = useNavigate();
  const { peerId } = useParams();
  useEffect(() => {
    if (Conn === undefined) connectTo(peerId);
    else navigate('/onitama/play'); //TODO: Remove fixed path
  }, []);

  if (Conn !== undefined) navigate('/onitama/play'); //TODO: Remove fixed path

  return (
    <div className="Join">
      Joining game...
    </div>
  );
}
