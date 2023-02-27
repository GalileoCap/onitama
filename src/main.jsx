import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Peer } from 'peerjs';

import store from './store';
import App from './App';
import './index.css';

function Main() {
  const [peer, setPeer] = useState(null);
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', () => setPeer(peer));
  }, []);

  if (peer === null) return <></>; //TODO: Show loading until peer has an id
  else return <App peer={peer} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Main />
	</Provider>
);
