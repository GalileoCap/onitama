/*
 * INFO:
 *  React entry point.
 */

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Main from './Main';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Main />
	</Provider>
);
