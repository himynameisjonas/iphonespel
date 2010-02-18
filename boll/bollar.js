$(document).ready(function(){
	spel = new Playfield(15,320,480);
	
	function update () {
		
		spel.update();
		
		t = setTimeout(function(){ update();},10)
	}
	update();
})

function Playfield (balls,x,y) {
	var that = this; // Fullösning för this-referenser inom events
	this.balls = [];
	this.xsize = x;
	this.ysize = y;
	
	for (var i = 0; i < balls; i++){
		this.balls[i] = new Ball(150,150,5,Math.random()*360); //Math.random()*360
	}
	
	this.update = function () {
		for (var i = this.balls.length - 1; i >= 0; i--){
			this.balls[i].update();
		}
	}
}

function Ball (x,y,s,d) {
	var that = this; // Fullösning för this-referenser inom events
	this.xpos = x;
	this.ypos = y;
	this.speed = s;
	this.direction = d; // NOLL är rakt åt höger, 0-360 grader medurs
	this.radius = 5;
	this.color = "333333";
	this.dom = $("<div />").
		css("width",this.radius*2+"px").
		css("height",this.radius*2+"px").
		css("background-color","#"+this.color).
		css("position","absolute").
		attr("class","ball");
		
	$("body").append(this.dom);
	
	this.move = function () {
		new_x = that.xpos+Math.cos((that.direction/180)*Math.PI)*that.speed;
		new_y = that.ypos+Math.sin((that.direction/180)*Math.PI)*that.speed;
		that.xpos = new_x;
		that.ypos = new_y;
	}
	
	this.draw = function () {
		that.dom.css("left",that.xpos).css("top",that.ypos)
	}
	
	this.collision_wall = function (x,y) {
		left = 0;
		right = x;
		top = 0;
		bottom = y;
		
		if ( (that.xpos+that.radius*2) >= right ) {
			that.direction = 180-that.direction;
		} else if (that.xpos <= 0 ) {
			that.direction = 180-that.direction;
		}
		
		if (that.ypos <= 0 ) {
			that.direction = 360-that.direction;
		} else if (that.ypos+that.radius*2 >= bottom) {
			that.direction = 360-that.direction;
		};
		
	}
	
	this.update = function () {
		$("#info").text(that.direction)
		that.collision_wall(320,480);
		that.move();
		that.draw();
	}
	
}