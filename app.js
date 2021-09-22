var express = require('express');
var logger = require('morgan');

//const mongoose = require('mongoose');

var usersRouter = require('./routes/users.routes');
var adminRouter = require('./routes/admin.routes');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const dbURI = process.env.dbURI;

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/users', usersRouter);
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

module.exports = app;