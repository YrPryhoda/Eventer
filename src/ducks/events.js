import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record, OrderedMap, OrderedSet } from 'immutable'
import eventsArray from 'helpers/eventsState'
// import renderNotification from 'components/Notification';
// import { push } from 'react-router-redux'
import { put, call, all, take, select } from 'redux-saga/effects';
import { createSelector } from 'reselect'

export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`;
const SELECT_EVENT = `${prefix}/SELECT_EVENT`;


const ReducerRecord = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  loading: false,
  loaded: false
})

const EventRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null,
})

export default (state = new ReducerRecord(), { type, payload }) => {
  switch (type) {
    case FETCH_ALL_REQUEST:
      return state;

    case FETCH_LAZY_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .mergeIn(['entities'], eventsArray(payload, EventRecord))
        .set('loading', false)
        .set('loaded', Object.keys(payload).length < 10)

    case SELECT_EVENT:
      return state.selected.contains(payload.uid) ?
        state.update('selected', selected => selected.remove(payload.uid)) :
        state.update('selected', selected => selected.add(payload.uid))

    default:
      return new ReducerRecord()
  }
}

export const stateSelector = (state) => state[moduleName];
export const eventsSelector = createSelector(stateSelector, events => events.entities)
export const eventsListSelector = createSelector(eventsSelector, entities => entities.valueSeq().toArray())

export const selectEvent = uid => ({
  type: SELECT_EVENT,
  payload: { uid }
})

export const watchFetchLazy = () => ({
  type: FETCH_ALL_REQUEST
})

const workerFetchAll = function* () {
  while (true) {
    yield take(FETCH_ALL_REQUEST);
    const state = yield select(state => state[moduleName]);

    if (state.loading) continue;

    yield put({
      type: FETCH_LAZY_START
    })

    const lastEvent = state.entities.last();

    const ref = firebase.database().ref('events')
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : '')

    const data = yield call([
      ref,
      ref.once
    ],
      'value'
    );

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    })
  }
}

export const saga = function* () {
  yield all([
    workerFetchAll()
  ])
}