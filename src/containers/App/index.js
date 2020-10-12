import React from 'react'
import store from 'redux/index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import history from 'helpers/history';
import Routes from '../Routes';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}

export default App
