import { appName } from 'constants/Firebase.js';
import { Record, OrderedMap } from 'immutable'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { generateId } from 'helpers/idGen';
import { reset } from 'redux-form';
import { createSelector } from 'reselect'
import firebase from 'firebase';
import peopleArray from 'helpers/eventsState'

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;
export const ADD_REQUEST = `${prefix}/ADD_REQUEST`;
export const ADD_SUCCESS = `${prefix}/ADD_SUCCESS`;
export const ADD_ERROR = `${prefix}/ADD_ERROR`;

export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`;
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`;
export const FETCH_PEOPLE_FAIL = `${prefix}/FETCH_PEOPLE_FAIL`;

export const stateSelector = (state) => state[moduleName];
export const peopleSelector = createSelector(stateSelector, people => people.people)
export const allPeopleSelector = createSelector(peopleSelector, people => people.valueSeq().toArray())

const ReducerRecord = Record({
  user: null,
  people: new OrderedMap({}),
  error: null,
  loading: false
})
const PeopleRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(
  state = new ReducerRecord(),
  action
) {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_PEOPLE_REQUEST:
    case ADD_REQUEST:
      return state.set('loading', true);

    case FETCH_PEOPLE_SUCCESS:
      return state
        .set('loading', false)
        .set('people', peopleArray(payload, PeopleRecord))
        .set('error', null)

    case ADD_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload)
        .set('error', null)

    case FETCH_PEOPLE_FAIL:
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
    const payload = { ...action.payload, id };
    yield firebase.database().ref('/people').push(payload);

    yield put({
      type: ADD_SUCCESS,
      payload
    })

    yield put(reset('peopleForm'))

  } catch (error) {
    yield put({
      type: ADD_ERROR,
      error
    })
  }
}

export const watcherFetchPeople = () => ({
  type: FETCH_PEOPLE_REQUEST,
})

const workerFetchPeople = function* () {
  try {
    const ref = firebase.database().ref('people');

    const data = yield call([
      ref,
      ref.once
    ],
      'value'
    );

    yield put({
      type: FETCH_PEOPLE_SUCCESS,
      payload: data.val()
    })

  } catch (error) {
    yield put({
      type: FETCH_PEOPLE_FAIL,
      error
    })
  }
}

export const saga = function* () {
  yield all([
    takeEvery(ADD_REQUEST, addPeopleSaga),
    takeEvery(FETCH_PEOPLE_REQUEST, workerFetchPeople)
  ])
}