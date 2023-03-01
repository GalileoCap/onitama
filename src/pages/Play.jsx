import { Conn } from '../peer';
import { useForceUpdate } from '../utils';

import Connect from '../Connect';
import Game from '../Game/Game';
import Chat from '../Chat/Chat';

export function Play() {
  useForceUpdate('conn');

  return (
    <div className="Play">
      {
        Conn === undefined
        ? <Connect />
        : <>
          <Game />
          <Chat />
        </>
      }
    </div>
  );
}
