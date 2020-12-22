import React from 'react'
import store from 'redux/index';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import history from 'helpers/history';
import Routes from '../Routes';
import { NotificationContainer } from 'react-notifications';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import 'styles/global.scss';

const App = () => {
  return (
    <Provider store={store}>
      <NotificationContainer />
      <ConnectedRouter history={history}>
        <DragDropContextProvider debugMode={true} backend={HTML5Backend}>
          <Routes />
        </DragDropContextProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
