const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

var apiRouter = require('./routes/client-api');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

if (process.env.NODE_ENV === 'production') {
  const logFile = './access.log';
  console.log("Production build server -- logging to file: " + logFile);
  app.use(logger('combined', {
    stream: fs.createWriteStream(logFile, {flags: 'a'})
  }));
}
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get('env') == 'development') {
  app.use(express.static(path.join(__dirname, '../Web/public')));
}

else if (app.get('env') == 'production') {
  // changes it to use the optimized version for production
  app.use(express.static(path.join(__dirname, '../Web/build')));
}

app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
