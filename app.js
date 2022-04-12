var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var errorRouter = require('./routes/error');
var articleRouter = require('./routes/article');
var logsRouter = require('./routes/logs');
const { clearLog } = require('./utils/corn')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser());
app.use('/commonstatic', express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/article', articleRouter);
app.use('/api/users', usersRouter);
app.use('/api/logs', logsRouter);

app.use('*', errorRouter);

clearLog()
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
