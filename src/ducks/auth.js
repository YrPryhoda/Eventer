import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import renderNotification from 'components/Notification';
import { put, call, take, all, cps } from 'redux-saga/effects';

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
    case SIGN_IN_SUCCESS:
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

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
});

export const signUpSaga = function* () {
  const auth = firebase.auth();
  while (true) {
    const action = yield take(SIGN_UP_REQUEST);
    try {
      const user = yield call([
        auth, // контекст
        auth.createUserWithEmailAndPassword //метод
      ],
        action.payload.email, //аргументы
        action.payload.password //аргументы
      );

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      });

    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error
      });
      renderNotification('error', error.message)
    }
  }
}

export const watchStatusChange = function* () {
  const auth = firebase.auth();

  try {
    yield cps([auth, auth.onAuthStateChanged])
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

export const saga = function* () {
  yield all([
    signUpSaga(),
    watchStatusChange()
  ])
}