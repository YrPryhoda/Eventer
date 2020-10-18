import React from 'react'
import PeopleForm from 'components/FormPeople';
import {addPeople} from 'ducks/people';
import { useDispatch } from 'react-redux';

const AddPeople = () => {
  const dispatch = useDispatch();
  const handleSignUp = (fields) => dispatch(addPeople(fields))


  return (
    <PeopleForm onSubmit={handleSignUp} />
  )
}

export default AddPeople
