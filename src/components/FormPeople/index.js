import React from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from 'components/ErrorField';
import { customFormValidator } from 'helpers/fieldValidate';
import styles from './styles.module.scss';

const FormPeople = ({ handleSubmit }) => {
  return (
    <div>
      <h2 className={styles.header}>Add people</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name='firstName'
          component={ErrorField}
        />
        <Field
          name='lastName'
          component={ErrorField}
        />
        <Field
          name='position'
          component={ErrorField}
        />
        <div>
          <input
            type='submit'
            value='Confirm'
            className={styles.btn}
          />
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'peopleForm',
  validate: customFormValidator
})(FormPeople)
