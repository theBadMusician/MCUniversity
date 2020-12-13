import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore;
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
