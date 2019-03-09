
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.fname = validText(data.fname) ? data.fname : '';
  data.lname = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';


  if (Validator.isEmpty(data.fname)) {
    errors.fname = 'First name field is required';
  }
  
  if (Validator.isEmpty(data.lname)) {
    errors.email = 'Last name field is required';
  }

  if (Validator.isEmpty(data.e_id)) {
    errors.e_id = 'Employee ID field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};