const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const employees = require("./routes/api/employees");
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log("connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/employees", employees);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));