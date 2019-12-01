var five = require("johnny-five");
var board = new five.Board();
board.on("ready",function(){
    var temperature =new five.Thermometer({
        controller: "LM35",
        pin:"A2"
    });
    temperature.on("change",function(){
        console.log(this.celsius + "C",this.fahrenheit + "F")
    })
})


