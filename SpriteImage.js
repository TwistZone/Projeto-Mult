"use strict";

class SpriteImage
{
	constructor(x, y, w, h, speed, clickable, img , car)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speedI = speed;
		this.speed = speed;

		//imagem
		this.img=img;
		this.imageData =this.getImageData(img);
		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;			
	}


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.speed = this.speedI;
		this.clickable = this.clickableIni;
	}

	getImageData(img){
		//cnavas com altura e largura do carro
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;

		var ctx = canvas.getContext("2d");
		//ctx.canvas.addEventListener("click", this.clickedBoundingBox);
		ctx.drawImage(img , 0, 0, this.width , this.height);
		return ctx.getImageData(0,0,this.width , this.height);
	}

	// ve se esta dentro do retangulo do carro
	mouseOverBoundingBox(ev , ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){

			return this.mouseincar(ev,ctx);
		}

		else
			return false;
	}

	//pode fazer o clik?
	clickedBoundingBox(ev, ctx) //ev.target é a canvas
	{
		if (!this.clickable){
			return false;
		}
		else
			return this.mouseOverBoundingBox(ev , ctx);
	}

	mouseincar(ev , ctx){

		var mx = Math.round(ev.offsetX-this.x);  //mx, my = mouseX, mouseY na canvas
		var my = Math.round(ev.offsetY - this.y);

		//var array = ctx.getImageData(this.x , this.y , this.width , this.height);

		var array = this.imageData;

		var indice = ((my*this.width + mx)*4) +3;

		if(array.data[indice] !== 0)
			return true;

		else
			return  false;

	}
	intersecaoTurbo(turbo) {
		if ((turbo.x + turbo.width) > this.x && turbo.x < (this.x + this.width) && (turbo.y + turbo.height) > this.y && turbo.y < (this.y + this.height)) {

			var turb = turbo.imageData.data;
			var car = this.imageData.data;
			//alterar a cena de dar uma
			for (var i = 0; i < car.length; i += 4) {
				for (var j = 0; j < turb.length; j += 4) {
					if (car[i + 3] != 0 && turb[j + 3] != 0)
						return true;
				}
			}
		} else
			return false;

	}
}