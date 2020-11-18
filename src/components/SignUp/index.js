import React from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from 'components/ErrorField';
import { validate } from 'helpers/fieldValidate';
import styles from './styles.module.scss'

const SignUp = ({ handleSubmit }) => {
  return (
    <div className={styles.signUpBlock}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name='email'
          component={ErrorField}
        />
        <Field
          name='password' 
          type='password'
          component={ErrorField}
        />
        <div>
          <input type='submit' className={styles.btn}/>
        </div>
      </form>
    </div>
  )
}


export default reduxForm({
  form: 'auth',
  validate
})(SignUp)
