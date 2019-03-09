const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Employee = mongoose.model('employees');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    Employee.findById(jwt_payload.id)
      .then(employee => {
        if (employee) {
          // return the employee to the frontend
          return done(null, employee);
        }
        // return false since there is no employee
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};