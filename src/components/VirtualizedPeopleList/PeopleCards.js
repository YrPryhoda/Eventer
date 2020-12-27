import React, { useEffect } from 'react'
import { List, AutoSizer } from 'react-virtualized';
import { useSelector, useDispatch } from 'react-redux';
import { allPeopleSelector, moduleName, watcherFetchPeople } from 'ducks/people';
import PersonCard from '../PersonCard';

const PeopleCards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(watcherFetchPeople());
  }, [])

  const people = useSelector(state => allPeopleSelector(state))
  const loading = useSelector(state => state[moduleName].loading);

  const rowRenderer = ({ index, key, style }) => (
    <PersonCard
      person={people[index]}
      style={style}
      key={key}
    />
  )

  return (
    loading ?
      <span> Loading... </span> :
      <AutoSizer >
        {({ width }) => (
          <List
            rowCount={people.length}
            rowHeight={70}
            height={300}
            width={width}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
  )
}

export default PeopleCards
