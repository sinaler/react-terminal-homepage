import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (window.location.hostname === 'www.inaler.com' || window.location.hostname === 'inaler.com') {
  window.location.replace('http://sercan.inaler.com');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
