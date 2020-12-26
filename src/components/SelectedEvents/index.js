import React from 'react'
import { selectedEventsSelector } from 'ducks/events';
import { useSelector } from 'react-redux'
import EventCard from 'components/EventCard';
import { TransitionMotion, spring } from 'react-motion';

const SelectedEvents = () => {
  const events = useSelector(state => selectedEventsSelector(state))

  const getStyles = () => {
    return events.map(event => {
      return ({
        style: {
          opacity: spring(1)
        },
        key: event && event.uid,
        data: event
      })
    })
  }

  const styleLeave = () => ({
    opacity: spring(0)
  })

  const willEnter = () => ({
    opacity: 0
  })

  return (
    <TransitionMotion
      styles={getStyles}
      willLeave={styleLeave}
      willEnter={willEnter}
    >
      { interpolated =>
        <>
          {
            interpolated.map(config => config.key && (
              <div style={config.style} key={config.key}>
                <EventCard
                  event={config.data}
                />
              </div>
            ))
          }
        </>
      }
    </TransitionMotion>
  )
}

export default SelectedEvents
