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

