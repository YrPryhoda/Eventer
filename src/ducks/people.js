import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import { put, takeEvery, call } from 'redux-saga/effects'
import { generateId } from 'helpers/idGen';

export const moduleName = 'people';
export const ADD_REQUEST = `${appName}/${moduleName}/ADD_REQUEST`;
export const ADD_SUCCESS = `${appName}/${moduleName}/ADD_SUCCESS`;
export const ADD_ERROR = `${appName}/${moduleName}/ADD_ERROR`;

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
    case ADD_REQUEST:
      return state.set('loading', true);
    case ADD_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload)
        .set('error', null)
    case ADD_ERROR:
      return state
        .set('loading', false)
        .set('error', error.message)
    default:
      return state;
  }
}

export const addPeople = (user) => {
  return {
    type: ADD_REQUEST,
    payload: user
  }
}

export const addPeopleSaga = function* (action) {
  try {
    const id = yield call(generateId);

    yield put({
      type: ADD_SUCCESS,
      payload: { ...action.payload, id }
    })

  } catch (error) {
    yield put({
      type: ADD_ERROR,
      error
    })
  }

}

export const saga = function* () {
  yield takeEvery(ADD_REQUEST, addPeopleSaga)
}