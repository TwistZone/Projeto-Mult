"use strict";

class SpriteImage
{
	constructor(x, y, w, h, speed, clickable, img )
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
		this.draggable = true;
		this.mouseDown=false;
		this.mouseOffsetX=0;
		this.mouseOffsetY =0;
		//teclado
		this.left=false;
		this.right=false;
		this.up=false;
		this.down=false;
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
		//console.log("seped inicila", this.speedI);
		this.speed = this.speedI;
		this.clickable = this.clickableIni;
	}

	getImageData(img){
		//cnavas com altura e largura do carro
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(img , 0, 0, this.width , this.height);
		return ctx.getImageData(0,0,this.width , this.height);
	}

	// ve se esta dentro do retangulo do carro
	mouseOverBoundingBox(ev , ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){

			return this.mouseinimg(ev,ctx);
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

	mouseinimg(ev , ctx){

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



	intersecaoTurbo(s1,s2) {

		if (s1.x >= s2.x && s1.x <= s2.x + s2.width && s1.y >= s2.y && s1.y <= s2.y + s2.height){
			return false;
		}

		var xmin = Math.max(s1.x, s2.x);
		var xMax = Math.min(s1.x + s1.width, s2.x + s2.width);
		var ymin = Math.max(s1.y, s2.y);
		var yMax = Math.min(s1.y + s1.height, s2.y + s2.height);


		for (let y = ymin; y <= yMax; y++) {
			for (let x = xmin; x <= xMax; x++) {
				var yLocal = Math.round(x - s1.x);
				var xLocal = Math.round(y - s1.y);
				var pixelNum = xLocal + yLocal * s1.width;
				var pixelPosArrayS1 = pixelNum * 4 + 3;

				var yLocalS2 = Math.round(x - s2.x);
				var xLocalS2 = Math.round(y - s2.y);
				var pixelNumS2 = xLocalS2 + yLocalS2 * s2.width;
				var pixelPosArrayS2 = pixelNumS2 * 4 + 3;

				if (s1.imageData.data[pixelPosArrayS1] !== 0 && s2.imageData.data[pixelPosArrayS2] !== 0)
					return true;
			}
		}
		return false;
	}

}

