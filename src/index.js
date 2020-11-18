import 'helpers/firebaseConfig.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import 'react-notifications/lib/notifications.css';
import {runMigration} from './mocks';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.runMigration = runMigration;