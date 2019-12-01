var five = require("johnny-five"),
  board, photoresistor;


  
  board1 = new five.Board(); 
board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log("light value:"+this.value);
  });
  board1.on("ready",function(){
    var temperature =new five.Thermometer({
        controller: "LM35",
        pin:"A4"
    });
    temperature.on("change",function(){
        console.log(this.celsius + "C",this.fahrenheit + "F");
    });
});
});


// References
//
// http://nakkaya.com/2009/10/29/connecting-a-photoresistor-to-an-arduino/
