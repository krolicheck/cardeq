var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ajaxRouter  = require('./routes/ajax');

var www = express();

// view engine setup
www.set('views', path.join(__dirname, 'views'));
www.set('view engine', 'pug');

www.use(logger('dev'));
www.use(express.json());
www.use(express.urlencoded({ extended: false }));
www.use(cookieParser());
www.use(express.static(path.join(__dirname, 'public')));

www.use('/', indexRouter);
www.use('/users', usersRouter);
www.use('/ajax',  ajaxRouter);

// catch 404 and forward to error handler
www.use(function(req, res, next) {
  next(createError(404));
});

// error handler
www.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = www;
