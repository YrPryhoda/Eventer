import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import logger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import history from 'helpers/history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  /* logger, */
  sagaMiddleware
]

const enchancer = applyMiddleware(
  ...middlewares
);

const store = createStore(
  rootReducer(history),
  composeWithDevTools(enchancer)
);

sagaMiddleware.run(rootSaga);

export default store