import { addPeopleSaga, ADD_REQUEST, ADD_SUCCESS } from 'ducks/people';
import { call, put } from 'redux-saga/effects';
import { generateId } from 'helpers/idGen';

it('should dispatch person with id', () => {
  const user = {
    firstName: 'Name',
    lastName: 'Second Name',
    position: 'senior'
  }

  const saga = addPeopleSaga({
    type: ADD_REQUEST,
    payload: user
  });

  expect(saga.next().value).toEqual(call(generateId))

  const id = generateId();

  expect(saga.next(id).value).toEqual(put({
    type: ADD_SUCCESS,
    payload: { ...user, id }
  }))

})