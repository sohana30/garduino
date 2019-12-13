var express = require('express');
var router = express.Router();
var five = require("johnny-five");
var board = new five.Board();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(getLightData());
});

function getLightData() {
    var data;

    // Create a new `photoresistor` hardware instance.
    photoresistor = new five.Sensor({
        pin: "A2",
        freq: 250,
        threshold: 50
    });

    board.repl.inject({
        pot: photoresistor
    });

    // "data" get the current reading from the photoresistor
    photoresistor.on("data", function() {
        console.log(this.value);
        data = this.value;
    });

    if(data != null) {
        return data;
    }
}

module.exports = router;
