import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';

import store from './store';
import { Peer, initPeer } from './peer';
import { useForceUpdate } from './utils';

import App from './App';
import './index.css';

function Main() {
  useForceUpdate('peer');
  useEffect(() => {
    initPeer();
  }, []);

  return (
    <div className="Main">
      {
        Peer === undefined
        ? <></>
        : <App />
      }
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Main />
	</Provider>
);
