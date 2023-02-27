import { Conn } from './peer';
import { useForceUpdate } from './utils';

import Connect from './Connect';
import Messages from './Messages';

export default function App() {
  useForceUpdate('conn');

  return (
    <div className="App">
      {
        Conn === undefined
        ? <Connect />
        : <Messages />
      }
    </div>
  );
}
