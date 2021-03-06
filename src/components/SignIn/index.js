import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { validate } from 'helpers/fieldValidate';
import ErrorField from 'components/ErrorField';
import styles from './styles.module.scss'

const SignIn = ({ handleSubmit }) => {
  return (
    <div className={styles.signInBlock}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>

        <Field
          name='email'
          component={ErrorField}
        />
        <Field
          name='password'
          component={ErrorField}
          type='password'
        />
        <div>
          <input type='submit' className={styles.btn} />
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'auth',
  validate
})(SignIn)
