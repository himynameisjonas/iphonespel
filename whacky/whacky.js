$(document).ready(function(){
	spel = new Playfield(4,320,6,480);
	
	
	function update () {
		
		spel.update();
		
		t = setTimeout(function(){ update();},10)
	}
	
	update();
})

function Square(x,y) {
	var that = this;
				
	this.dom = $("<div />").
		css("width", x+"px").
		css("height",y+"px").
		//css("background-color","red").
		attr("class","square");
}


// rutor i x-led, x, yled, y
function Playfield (xsq,x,ysq,y) {
	var that = this; // Fullösning för this-referenser inom events
	console.log("here");
	this.squares = new Array(ysq);
	this.xsize = x;
	this.ysize = y;
	console.log(that.squares);
	for (var i = 0; i < ysq; i++){
		this.squares[i] = new Array( xsq );
		for (var j = 0; j<xsq; j++ ) {
			console.log( "skapar ny fyrkant");				
			that.squares[i][j] = new Square( x/xsq, y/ysq );
			
			$("#playfield").append( that.squares[i][j].dom );
		}
	}
}
