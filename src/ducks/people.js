import { appName } from 'constants/Firebase.js';
import { Record, OrderedMap } from 'immutable'
import { put, takeEvery, call, all, select, fork, spawn, cancel, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import { generateId } from 'helpers/idGen';
import { reset } from 'redux-form';
import { createSelector } from 'reselect'
import firebase from 'firebase';
import peopleArray from 'helpers/eventsState'
import renderNotification from 'components/Notification';

export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;

export const ADD_REQUEST = `${prefix}/ADD_REQUEST`;
export const ADD_SUCCESS = `${prefix}/ADD_SUCCESS`;
export const ADD_ERROR = `${prefix}/ADD_ERROR`;

export const FETCH_PEOPLE_REQUEST = `${prefix}/FETCH_PEOPLE_REQUEST`;
export const FETCH_PEOPLE_SUCCESS = `${prefix}/FETCH_PEOPLE_SUCCESS`;
export const FETCH_PEOPLE_FAIL = `${prefix}/FETCH_PEOPLE_FAIL`;

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`;
export const ADD_EVENT_FAIL = `${prefix}/ADD_EVENT_FAIL`;

export const stateSelector = (state) => state[moduleName];
export const peopleSelector = createSelector(stateSelector, people => people.people)
export const allPeopleSelector = createSelector(peopleSelector, people => people.valueSeq().toArray())

export const idSelector = (_, props) => props.uid;
export const personSelector = createSelector(peopleSelector, idSelector, (entities, id) => entities.get(id))

const ReducerRecord = Record({
  user: null,
  people: new OrderedMap({}),
  error: null,
  loading: false
});

const PeopleRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
  events: []
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

    case ADD_EVENT_SUCCESS:
      return state
        .setIn(['people', payload.personId, 'events'], payload.events)

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

    renderNotification('success', 'Added successfully')
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

export const cancelPeopleSync = function* () {
  let task;
  while (true) {
    const { payload } = yield take('@@router/LOCATION_CHANGE');

    if (payload && payload.location.pathname.includes('people')) {
      task = yield fork(realtimeSync)
    } else if (task) {
      yield cancel(task);
    }
  }
}


const createPeopleSocket = () => eventChannel(emit => {
  const ref = firebase.database().ref('people');
  const callback = data => {
    emit({ data })
  }
  ref.on('value', callback);

  return () => ref.off('value', callback)
})

export const realtimeSync = function* () {
  const channel = yield call(createPeopleSocket);
  try {
    while (true) {
      const { data } = yield take(channel);
      yield put({
        type: FETCH_PEOPLE_SUCCESS,
        payload: data.val()
      })
    }
  } finally {
    yield call([channel, channel.close]);
  }
}

export const addEventWatcher = (eventId, personId) => ({
  type: ADD_EVENT_REQUEST,
  payload: {
    eventId,
    personId
  }
})

const addEventWorker = function* (action) {
  const { eventId, personId } = action.payload;
  const eventsRef = firebase
    .database()
    .ref(`people/${personId}/events`);
  const state = yield select(stateSelector);
  const events = state.getIn(['people', personId, 'events']).concat(eventId)
  try {

    yield call([
      eventsRef,
      eventsRef.set
    ],
      events
    )

    yield put({
      type: ADD_EVENT_SUCCESS,
      payload: {
        personId,
        events
      }
    })

    renderNotification('success', 'User subscribed')
  } catch (error) {
  }
}

export const saga = function* () {
  yield spawn(cancelPeopleSync);

  yield all([
    takeEvery(ADD_REQUEST, addPeopleSaga),
    takeEvery(FETCH_PEOPLE_REQUEST, workerFetchPeople),
    takeEvery(ADD_EVENT_REQUEST, addEventWorker),
  ])
}