import React, { useEffect } from 'react'
// import EventsList from 'components/EventsList';
import VirtualizedEventsList from 'components/VirtualizedEventsList';
import { useSelector, useDispatch } from 'react-redux'
import { moduleName, selectEvent, watchFetchLazy, eventsListSelector } from 'ducks/events';

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => eventsListSelector(state));
  const loaded = useSelector(state => state[moduleName].loaded);

  const handleRowClick = ({ rowData }) => dispatch(selectEvent(rowData.uid));

  const handleLoadMore = () => {
    dispatch(watchFetchLazy())
  };

  useEffect(() => {
    dispatch(watchFetchLazy())
  }, []);

  return <VirtualizedEventsList
    handleLoadMore={handleLoadMore}
    handleClick={handleRowClick}
    events={events}
    loaded={loaded}
  />

}

export default EventsPage
