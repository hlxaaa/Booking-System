var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

// var btn = require('./routes/btn');
// var result = require('/routes/result');


var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// 设置页面引擎（ejs）
// 设置为.html 
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({  
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'love'  
})); 

// app.use('/result',result);

// 输出日志到目录
var fs = require('fs');
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a',  encoding:'utf8'}); // 记得要先把目录建好，不然会报错
app.use(logger('combined', {stream: accessLogStream}));

app.use('/', routes);
app.use('/users', users); // 自定义cgi路径

app.use(express.static(__dirname+'/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



// production error handler
// no stacktraces leaked to user

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.use(function(err, req, res, next) {
  res.send(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
