
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.e_id = validText(data.e_id) ? data.e_id : '';
  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.e_id)) {
    errors.email = 'Employee ID field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};