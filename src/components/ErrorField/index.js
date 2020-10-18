import React from 'react'

const ErrorField = ({ input, type, meta: { error, touched } }) => {
  const errorText = touched && error && <div>{error}</div>
  return (
    <div>
      <label>{input.name}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  )
}

export default ErrorField
