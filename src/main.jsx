import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import { Peer, initPeer } from './peer';
import App from './App';
import './index.css';

function useForceUpdate() {
  const [ val, setVal ] = useState(0);
  return () => setVal(val => val + 1);
}

function Main() {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    initPeer();
  }, []);

  return (
    <div>
      {
        Peer !== null
        ? <App />
        : <></>
      }
      <button onClick={forceUpdate}>Update</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Main />
	</Provider>
);
