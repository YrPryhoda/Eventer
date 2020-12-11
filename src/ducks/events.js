import firebase from 'firebase';
import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import renderNotification from 'components/Notification';
import { push } from 'react-router-redux'
import { put, call, take, all, cps, takeEvery } from 'redux-saga/effects';

export const moduleName = 'events';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;

const ReducerRecord = Record({

})

export default (state = new ReducerRecord(), { type, payload }) => {
  switch (type) {

    default:
      return state
  }
}




export const saga = function* () {

}