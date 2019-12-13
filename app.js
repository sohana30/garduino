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
