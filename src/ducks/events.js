import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record, OrderedMap, OrderedSet } from 'immutable'
import eventsArray from 'helpers/eventsState'
import renderNotification from 'components/Notification';
import { put, call, all, take, select, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`;

const SELECT_EVENT = `${prefix}/SELECT_EVENT`;

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`;
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`;
export const DELETE_EVENT_FAIL = `${prefix}/DELETE_EVENT_FAIL`;


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

    case DELETE_EVENT_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['entities', payload.uid])

    default:
      return state
  }
}

export const stateSelector = (state) => state[moduleName];
export const eventsSelector = createSelector(stateSelector, events => events.entities)
export const eventsListSelector = createSelector(eventsSelector, entities => entities.valueSeq().toArray());
export const sectionSelector = createSelector(stateSelector, selection => selection.selected)
export const selectedEventsSelector = createSelector(eventsSelector, sectionSelector, (entities, selection) => (
  selection.toArray().map(uid => entities.get(uid))
))
export const idSelector = (_, props) => props.uid;
export const eventSelector = createSelector(eventsSelector, idSelector, (entities, id) => entities.get(id))


export const selectEvent = uid => ({
  type: SELECT_EVENT,
  payload: { uid }
})

export const watchFetchLazy = () => {
  return {
    type: FETCH_ALL_REQUEST
  }
}

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

export const removeEventWatcher = (payload) => ({
  type: DELETE_EVENT_REQUEST,
  payload
})

const removeEventWorker = function* (action) {
  const { payload } = action;

  const ref = firebase.database().ref(`events/${payload.uid}`)

  try {
    yield call([
      ref,
      ref.remove
    ]);

    yield put({
      type: DELETE_EVENT_SUCCESS,
      payload
    })

    renderNotification('info', 'Event deleted successfully')
  } catch (_) {

  }
}

export const saga = function* () {
  yield all([
    workerFetchAll(),
    takeEvery(DELETE_EVENT_REQUEST, removeEventWorker)
  ])
}