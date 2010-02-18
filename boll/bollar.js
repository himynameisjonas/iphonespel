$(document).ready(function(){
	boll = new Ball(10,10,1,45)
	boll2 = new Ball( 90,10,1,135)
	
	function update () {
		
		// for all balls (objects) in list (TODO or body/div dom descendants?), call move, collision & draw
		boll.move();
		boll.draw();
		boll.collision();
		boll2.move();
		boll2.draw();
		boll2.collision();
				
		t = setTimeout(function(){ update(); },10)
	}
	
	update();
})

function Ball (x,y,s,d) {
	var that = this; // Fullösning för this-referenser inom events
	
	this.xpos = x;
	this.ypos = y;
	this.speed = s; // pixlar
	this.direction = d; // NOLL är rakt åt höger, 0-360 grader medurs
	
	this.radius = 5;
	this.color = "333333";
	this.dom = $("<div />").
		css("width",this.radius*2+"px").
		css("height",this.radius*2+"px").
		css("background-color","#"+this.color).
		css("position","absolute").
		attr("class","Ball");
		
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
	
	this.collision = function(){
		// TODO check if we overlap w/any other object in the parent container?
	}
	
	
}