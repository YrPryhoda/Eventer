import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import renderNotification from 'components/Notification';
import { push } from 'react-router-redux'
import { put, call, take, all, cps, takeEvery } from 'redux-saga/effects';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_FAIL = `${appName}/${moduleName}/SIGN_IN_FAIL`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;

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
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('loading', true);

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('error', null)

    case SIGN_IN_FAIL:
      return state
        .set('loading', false)
    case SIGN_UP_ERROR:
      return state
        .set('loading', false)
        .set('error', error.message)

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord()

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

export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  }
}

export const signOutSaga = function* () {
  const auth = firebase.auth();

  try {
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS,
    })
    yield put(push('/auth/signin'))

  } catch (_) {

  }
}

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password }
})

export const signInSaga = function* (action) {
  try {
    const auth = firebase.auth();

    const user = yield call([
      auth, // контекст
      auth.signInWithEmailAndPassword //метод
    ],
      action.payload.email, //аргументы
      action.payload.password //аргументы
    );

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    });
    yield put(push('/people'));

  } catch (error) {
    renderNotification('error', 'Login failed')
    yield put({
      type: SIGN_IN_FAIL
    })
  }
}

export const saga = function* () {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    signUpSaga(),
    watchStatusChange(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga)
  ])
}