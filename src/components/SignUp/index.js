import React from 'react'
import { reduxForm, Field } from 'redux-form'

const SignUp = ({handleSubmit}) => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label> e-mail:</label>
          <Field
            name='email'
            component='input'
          />
        </div>
        <div>
          <label> password:</label>
          <Field
            name='password'
            component='input'
            type='password'
          />
        </div>
        <div>
          <input type='submit' />
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'auth'
})(SignUp)
