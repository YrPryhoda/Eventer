import { appName } from 'constants/Firebase.js';
import { Record } from 'immutable'
import renderNotification from 'components/Notification';

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
        .set('user', payload.user)
        .set('error', null)
    case ADD_ERROR:
      return state
        .set('loading', false)
        .set('error', error.message)
    default:
      return state;
  }
}

export const addPeople = (user) => dispatch => {
  try {
    dispatch({
      type: ADD_REQUEST
    });
    dispatch({
      type: ADD_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    dispatch({
      type: ADD_ERROR,
      error
    })
  }

}