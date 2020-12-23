import React from 'react'
import { selectedEventsSelector } from 'ducks/events';
import { useSelector } from 'react-redux'
import EventCard from 'components/EventCard';

const SelectedEvents = () => {
  const events = useSelector(state => selectedEventsSelector(state))
  return (
    <div>
      {
        events.map(event => event && (
          <EventCard
            event={event}
            key={event.uid}
          />
        ))
      }
    </div>
  )
}

export default SelectedEvents
