$(document).ready(function(){
	boll = new Ball(10,10,5,90)
	function update () {
		
		boll.move();
		boll.draw();
		
		t = setTimeout(function(){ update();},10)
	}
	update();
})

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
		css("position","absolute");
		
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
	
	
}