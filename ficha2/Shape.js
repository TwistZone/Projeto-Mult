"use strict";

class Shape
{
	constructor(x, y) //define coordenadas da forma
	{
		this.x = x;
		this.y = y;
	}
	toString()
	{
		return "(" + this.x + ", " + this.y + ")";
	}
}
class Rectangle extends Shape{
	constructor(x,y,w,h) {
		super(x,y); // canto superior esquerdo
		this.w=w;
		this.h=h;

	}
	draw(ctx){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x,this.y,this.w,this.h);
	}
}
class Circle extends Shape{
	constructor(x,y,r){
		super(x,y);
		this.r=r;
	}
	draw(ctx){
		ctx.fillStyle = "#0000FF";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI); //ângulos em radianos
		ctx.fill();
	}
}




/* add your code */