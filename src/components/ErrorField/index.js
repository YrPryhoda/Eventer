import React from 'react'
import styles from './styles.module.scss';

const ErrorField = ({ input, type, meta: { error, touched } }) => {
  const errorText = touched &&
    error &&
    <div className={styles.errorField}>{error}</div>

  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.fieldLabel}>{input.name}</label>
      <input className={styles.inputField} {...input} type={type} />
      {errorText}
    </div>
  )
}

export default ErrorField
