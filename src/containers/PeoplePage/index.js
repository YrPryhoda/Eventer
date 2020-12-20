import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allPeopleSelector, moduleName, watcherFetchPeople } from 'ducks/people'
import Spinner from 'components/Spinner';
import PeopleList from 'components/VirtualizedPeopleList'
const PeoplePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(watcherFetchPeople())
  }, []);

  const people = useSelector(state => allPeopleSelector(state))
  const loading = useSelector(state => state[moduleName].loading)

  return loading ?
    <Spinner /> :
    <PeopleList people={people} />
}

export default PeoplePage
