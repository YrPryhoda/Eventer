import React from 'react'
import { useSelector } from 'react-redux';
import { eventSelector } from 'ducks/events';

const EventDragPreview = (props) => {
  const event = useSelector(state => eventSelector(state, props))

  return (
    <div>
      <h1>{event.title}</h1>
    </div>
  )
}

export default EventDragPreview
