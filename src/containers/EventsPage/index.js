import React, { useEffect } from 'react'
import EventsList from 'components/EventsList';
import { useSelector, useDispatch } from 'react-redux'
import { moduleName, watchFetchAll, eventsListSelector } from 'ducks/events';
import Spinner from 'components/Spinner'

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => eventsListSelector(state));
  const loaded = useSelector(state => state[moduleName].loaded);

  useEffect(() => {
    dispatch(watchFetchAll())
  }, []);

  return !loaded ? <Spinner /> : <EventsList events={events} />

}

export default EventsPage
