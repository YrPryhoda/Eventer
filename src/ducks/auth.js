import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import renderNotification from 'components/Notification';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export default function reducer(
  state = new ReducerRecord(),
  action
) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set('loading', true);

    case SIGN_UP_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('error', null)

    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', error.message)

    default:
      return state;
  }
}

export const signUp = (email, password) => dispatch => {
  dispatch({
    type: SIGN_UP_REQUEST
  });

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    }))
    .catch(error => {
      renderNotification('error', error.message);
      return dispatch({
        type: SIGN_UP_ERROR,
        error
      })
    })
}

/* firebase.auth().onAuthStateChanged(user => {
  const store = require('../redux')
  store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
}) */
