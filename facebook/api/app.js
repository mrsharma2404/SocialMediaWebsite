var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/(1) Signup');
var friendsRouter = require('./routes/(3) Friends_part1');
var imageRouter = require('./routes/(2) Image');
var friends1Router = require('./routes/(4) Friends_part2');
var conversationRouter = require('./routes/(5) Conversation')
var messageRouter = require('./public/extradata/(6) message')
var message2Router = require('./routes/(6) message2')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/friends', friendsRouter);
app.use('/image', imageRouter);
app.use('/friends1', friends1Router);
app.use('/conversation',conversationRouter);
app.use('/message',messageRouter)
app.use('/message2',message2Router)



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
  res.render('error');
});

module.exports = app;
