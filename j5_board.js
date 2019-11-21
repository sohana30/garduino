var {Board,Led}=require("johnny-five");
var board = new Board();
board.on("ready",function(){
	console.log("board is ready");
	var led = new Led(13);
	led.blink(200);
});