import React from 'react'
import style from './styles.module.scss';

const EventCard = ({ event: { title, when, where } }) => {
  return (
    <div className={style.card}>
      <h3>{title}</h3>
      <p>{where}, {when}</p>
    </div>
  )
}

export default EventCard
