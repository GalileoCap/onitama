import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Peer } from 'peerjs';

import App from './App';
import './index.css';

function Main() {
  const [peer, setPeer] = useState(null);
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', () => setPeer(peer));
  }, []);

  if (peer === null) return <></>; //TODO: Show loading until peer has an id
  else return <App peer={peer} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
);
