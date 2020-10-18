import React from 'react'
import store from 'redux/index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import history from 'helpers/history';
import Routes from '../Routes';
import { NotificationContainer } from 'react-notifications';

import 'helpers/firebaseConfig.js';
import 'styles/global.scss';

const App = () => {
  return (
    <Provider store={store}>
      <NotificationContainer />
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}

export default App
