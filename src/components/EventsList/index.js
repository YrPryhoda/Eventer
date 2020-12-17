import React from 'react'
import styles from './styles.module.scss'

const EventsList = ({ events, handleClick }) => {

  const renderRows = () => {
    return events.map(event => {
      return (
        <tr key={event.uid} onClick={() => handleClick(event.uid)}>
          <td>{event.title}</td>
          <td>{event.where}</td>
          <td>{event.when}</td>
          <td><a target='blank' href={event.url}>{event.url} </a></td>
        </tr>)
    })
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Place</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {
            renderRows()
          }
        </tbody>
      </table>
    </div>
  )
}

export default EventsList
