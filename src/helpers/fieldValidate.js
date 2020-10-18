import emailValidator from 'email-validator';
import validator from 'validator';

export const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'Invalid email';

  if (!password) errors.password = 'Password required'
  else if (password.length < 3) errors.password = 'Password is too short'

  return errors;
}

export const basicValidate = (field) => validator.isEmpty(field, { ignore_whitespace: true }) || validator.isLength(field, { min: 0, max: 1 })

export const customFormValidator = (obj) => {
  const errors = {};
  for (let key in obj) {
    if (basicValidate(obj[key])) {
      errors[key] = 'Invalid value'
    }
  }

  return errors;

}