import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record, OrderedMap } from 'immutable'
import eventsArray from 'helpers/eventsState'
// import renderNotification from 'components/Notification';
// import { push } from 'react-router-redux'
import { put, call, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

export const moduleName = 'events';
export const FETCH_ALL_REQUEST = `${appName}/${moduleName}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${appName}/${moduleName}/FETCH_ALL_SUCCESS`;
export const FETCH_ALL_FAIL = `${appName}/${moduleName}/FETCH_ALL_FAIL`;

const ReducerRecord = Record({
  entities: new OrderedMap({}),
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
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('entities', eventsArray(payload, EventRecord))
        .set('loading', false)
        .set('loaded', true)
    default:
      return new ReducerRecord()
  }
}

export const stateSelector = (state) => state[moduleName];
export const eventsSelector = createSelector(stateSelector, events => events.entities)
export const eventsListSelector = createSelector(eventsSelector, entities => entities.valueSeq().toArray())


export const watchFetchAll = () => ({
  type: FETCH_ALL_REQUEST
})

const workerFetchAll = function* () {
  const ref = firebase.database().ref('events')

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

export const saga = function* () {
  yield takeEvery(FETCH_ALL_REQUEST, workerFetchAll)
}