import React, { useEffect } from 'react'
// import EventsList from 'components/EventsList';
import VirtualizedEventsList from 'components/VirtualizedEventsList';
import { useSelector, useDispatch } from 'react-redux'
import { moduleName, selectEvent, watchFetchAll, eventsListSelector } from 'ducks/events';
import Spinner from 'components/Spinner'

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => eventsListSelector(state));
  const loaded = useSelector(state => state[moduleName].loaded);

  const handleRowClick = ({ rowData }) => dispatch(selectEvent(rowData.uid));


  useEffect(() => {
    dispatch(watchFetchAll())
  }, []);

  return !loaded ?
    <Spinner /> :
    <VirtualizedEventsList handleClick={handleRowClick} events={events} />

}

export default EventsPage
