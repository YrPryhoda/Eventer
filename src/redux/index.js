import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from 'helpers/history';
import createSagaMiddleware from 'redux-saga';
import { saga } from '../ducks/people';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  /* logger, */
  thunk,
  sagaMiddleware
]

const enchancer = applyMiddleware(
  ...middlewares
);

const store = createStore(
  rootReducer(history),
  composeWithDevTools(enchancer)
);
window.store = store;

sagaMiddleware.run(saga);

export default store