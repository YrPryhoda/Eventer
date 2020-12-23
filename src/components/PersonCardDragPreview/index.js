import React from 'react'
import { useSelector } from 'react-redux';
import { personSelector } from 'ducks/people';

const PersonCardDragPreview = (props) => {
  const person = useSelector(state => personSelector(state, props))
  return (
    <div>
      <h1>{person.firstName}</h1>
    </div>
  )
}

export default PersonCardDragPreview
