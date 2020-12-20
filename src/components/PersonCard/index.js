import React from 'react'

const PersonCard = ({ person, style }) => {
  return (
    <div style={{ width: 200, height: 100, ...style }}>
      <h3>{person.firstName}&nbsp;{person.lastName}</h3>
      <p>{person.email}</p>
    </div>
  )
}

export default PersonCard
