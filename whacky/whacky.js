$(document).ready(function(){
	whacky = new Playfield(4,320,6,480);
	
	
	function update () {
		
		t = setTimeout(function(){ update();},10)
	}
	
	update();
})

function Square(x,y) {
	
	// "constructor"
	var that = this;
				
	this.dom = $("<div />").
		css("width", x+"px").
		css("height",y+"px").
		attr("class","square");
		
	// handle clicks
	//this.update = function( )
	
	
	this.dom.ontouchstart = function(evt){
 		 console.log(evt.pageX + "/" + evt.pageY);
	}
	
	
}


// rutor i x-led, x, yled, y
function Playfield (xsq,x,ysq,y) {
	var that = this; // Fullösning för this-referenser inom events

	this.xsize = x;
	this.ysize = y;
	this.squares = new Array(ysq);
	for (var i = 0; i < ysq; i++){
		this.squares[i] = new Array( xsq );
		for (var j = 0; j<xsq; j++ ) {	
			that.squares[i][j] = new Square( x/xsq, y/ysq );	
			$("#playfield").append( that.squares[i][j].dom );
		}
	}
}
