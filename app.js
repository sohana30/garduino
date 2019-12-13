//Server Side
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Johnny-Five Imports
var five = require("johnny-five");
var board = new five.Board();

board.on("ready",function(){
  var temperature =new five.Thermometer({
      controller: "LM35",
      pin:"A0",
  });

  photoresistor = new five.Sensor({
      pin: "A2",
      freq: 250
  });

  board.repl.inject({
      pot: photoresistor
  });

  var retCounter = 30;
  io.on('connection', function (socket) {
      photoresistor.on("data", function(){
          //console.log(this.value);
          setTimeout(() => {
            socket.emit('lightsensor', this.value);
          }, 5000);
          //socket.emit('lightsensor', this.value);
      });

      temperature.on("change",function(){
        //console.log(this.celsius + "C",this.fahrenheit + "F")
          if(retCounter == 0) {
            console.log(this.celsius + "C",this.fahrenheit + "F");
            socket.emit('tempsensor', this.celsius);
            retCounter = 30;
          }
          retCounter--;
        //socket.emit('tempsensor', this.celsius);
      });
  });
});


//Route Linkers.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geocodeRoute = require('./routes/geocode');
//var sensorRoute = require('./routes/sensor');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/geocode', geocodeRoute);
//app.use('/sensor', sensorRoute);

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

//[*]HTTP Listener
server.listen(3000);

module.exports = app;
