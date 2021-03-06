$(document).ready(function(){
	$('body').bind('touchmove', function(e){e.preventDefault()});
	whacky = new Playfield(4,320,6,465);
	whacky.start();
	
})

function Square(x,y,playfield,color) {
	
	// "constructor"
	var that = this;
	this.playfield = playfield;
	this.color = color;
	this.dom = $("<div />").
		css("width", (x-2)+"px").
		css("height",(y-2)+"px").
		css("background-color","#"+this.color).
		attr("class","square");
	this.active = false;
	this.timeout = null;

	this.dom.click(function(){
		if (that.active) {
			clearTimeout(that.timeout);
			that.set_inactive();
			that.playfield.force_update();
			that.playfield.hits++;
		} else {
			that.playfield.misses++;
		}
	})
	
	this.set_active = function(){
		this.active = true;
		this.dom.css("background-color","yellow")
		this.timeout = setTimeout(function(){
			that.set_inactive();
			that.playfield.gameover();
		},3000)
		
	}
	
	this.set_inactive = function(){
		this.active = false;
		this.dom.css("background-color","#"+this.color)
	}
	
}


// rutor i x-led, x, yled, y
function Playfield (xsq,x,ysq,y) {
	var that = this; // Fullösning för this-referenser inom events

	this.xsize = x;
	this.ysize = y;
	this.xsquares = xsq;
	this.ysquares = ysq;
	this.delay = 5000;
	this.t = null;
	this.hits = 0;
	this.misses = 0;
	this.colors = ["F2DFCE","F29849","653A4B","689BA6","D9415D"];
	this.squares = new Array(ysq);
	
	for (var i = 0; i < ysq; i++){
		this.squares[i] = new Array( xsq );
		for (var j = 0; j<xsq; j++ ) {
			that.squares[i][j] = new Square( x/xsq, y/ysq, that, this.colors[parseInt(Math.random()*this.colors.length)] );	
			$("#playfield").append( that.squares[i][j].dom );
		}
	}
	
	this.update = function (){
		clearTimeout(that.t)
		that.squares[parseInt(Math.random()*that.ysquares)][parseInt(Math.random()*that.xsquares)].set_active();
		that.t = setTimeout(function(){ that.update();},5000)
	}
	
	this.force_update = function () {
		clearTimeout(that.t)
		that.update()
	}
	
	this.gameover = function () {
		clearTimeout(that.t);
		$("#info span").html("Antal träffar: "+that.hits+"<br/>Antal missar: "+that.misses+"<br/><br/>Klicka för att spela igen")
		$("#info").slideDown("fast");
		$("#info").unbind("click").click(function(){
			$("#info").slideUp("fast");
			that.hits = 0;
			that.misses = 0;
			that.update();
		})
	}
	
	this.start = function () {
		clearTimeout(that.t)

		$("#info span").text("Klicka för att starta")
		$("#info").show();
		$("#info").unbind("click").click(function(){
			$("#info").slideUp("fast");
			that.update();
		})
	}
}
