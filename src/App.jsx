import { Conn } from './peer';
import { useForceUpdate } from './utils';

import Connect from './Connect';
import Game from './Game/Game';
import Chat from './Chat/Chat';

export default function App() {
  useForceUpdate('conn');

  return (
    <div className="App">
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
