import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from 'helpers/history';

const middlewares = [routerMiddleware(history), logger, thunk]

const enchancer = applyMiddleware(
  ...middlewares
);

const store = createStore(
  rootReducer(history),
  composeWithDevTools(enchancer)
);

window.store = store;

export default store