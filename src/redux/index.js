import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from 'helpers/history';


const middlewares = applyMiddleware(
  thunk,
  logger,
  routerMiddleware(history)
);

const store = createStore(
  reducer(history), 
  middlewares
  );
  
window.store = store;

export default store