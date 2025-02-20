var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const cors = require('cors');
const {connectToMongoDB} = require('./db/BD')

///////
require("dotenv").config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var terrainsRouter = require('./routes/terrains');
var equipesRouter = require('./routes/equipes');
var matchsRouter = require('./routes/matchs');
const session = require('express-session')




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:3000', // Your client URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(session({
  secret: "token9antra",
  resave: false,
  saveUninitialized : true,
  cookie: { secure: false , maxAge: 6 *60 * 60 * 1000,httpOnly: true} 
}))

/////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/terrains', terrainsRouter);
app.use('/equipes', equipesRouter);
app.use('/matchs', matchsRouter);






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
  res.json('error');
});


var server =http.createServer(app); 
server.listen(process.env.PORT,() => {connectToMongoDB(),console.log("app is running on port ",process.env.PORT)});

module.exports = app;
