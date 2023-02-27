import { Conn } from './peer';
import { useForceUpdate } from './utils';

import Connect from './Connect';
import Game from './Game';
import Messages from './Messages';

export default function App() {
  useForceUpdate('conn');

  return (
    <div className="App">
      {
        Conn === undefined
        ? <Connect />
        : <>
          <Game />
          <Messages />
        </>
      }
    </div>
  );
}
