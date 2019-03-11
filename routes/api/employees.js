const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Employee = require('../../models/Employee');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

router.get("/test", (req, res) => res.json({ msg: "This is the employees route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

  res.json({
    id: req.user.id,
    e_id: req.user.e_id,
    fname: req.user.fname,
    lname: req.user.lname
  });
})

router.get('/', (req, res) => {
  const input = req.query.input;
  if(!input){
    return res.json([]);
  }
  const regex = new RegExp(input,'gi')
  const emp_id = Number.isInteger(input) ? Number(input) : ''
  Employee.find({$or: [{fname: regex},{lname: regex}]})
      .sort({ date: -1 })
      .limit(10)
      .then(employees => res.json(employees))
      .catch(err => res.status(404).json({ noemployeesfound: 'No employees found' }));
});

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Check to make sure nobody has already registered with a duplicate e_id
  Employee.findOne({ e_id: req.body.e_id })
    .then(employee => {
      if (employee) {
        errors.e_id = "Employee ID already exists"
        return res.status(400).json(errors)
      } else {
        // Otherwise create a new employee
        const newEmployee = new Employee({
          fname: req.body.fname,
          lname: req.body.lname,
          e_id: req.body.e_id,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newEmployee.password, salt, (err, hash) => {
            if (err) throw err;
            newEmployee.password = hash;
            newEmployee.save()
              .then(employee => {
                const payload = { id: employee.id, name: employee.fname };
  
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const e_id = req.body.e_id;
  const password = req.body.password;

  Employee.findOne({e_id})
    .then(employee => {
      if (!employee) {
        errors.e_id = "This employee ID and password combination does not exist";
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, employee.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: employee.id, name: employee.fname };

            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            errors.password = "Incorrect password";
            return res.status(400).json(errors);
          }
        })
    })
})

module.exports = router;