import React from 'react'
import EventsList from 'components/EventsList';
import { useSelector, useDispatch } from 'react-redux'
import { moduleName } from 'ducks/events'

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state[moduleName]);
  console.log(events, dispatch);

  return (
    <div>
      <EventsList />
    </div>
  )
}

export default EventsPage
