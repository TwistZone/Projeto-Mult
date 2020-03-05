"use strict";

(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());


function main()
{
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var cw = canvas.width;
	var ch = canvas.height;
	var i,n=20,maxDim=50;
	var shapelist=[];
	var w,h,x,y;
	for(i=0;i<n;i++) {
		var rad = Math.floor((Math.random()*50)+5);
		var shape = Math.floor((Math.random()*10) + 1); //gerador aleatório de 0 a 10 para ~50% de ret/circ
		// Draw Rectangle
		if (shape <= 5) {
			w = Math.floor((Math.random()*maxDim) + 1);
			h = Math.floor((Math.random()*maxDim) + 1);
			x = Math.floor((Math.random()* (cw-w)) + 1);
			y = Math.floor((Math.random()*(ch-h)) + 1);
			let rectangle = new Rectangle(x, y, w, h); // Deteção de erros scope (?)
			rectangle.draw(ctx);
			shapelist.push(rectangle); // Equivalente Java ArrayList.add
		} else {
			 x = Math.floor((Math.random() * (cw - rad)) + rad);
			 y = Math.floor((Math.random() * (ch - rad)) + rad);
			if (y + rad > ch) y = y - rad;
			if (x + rad > cw) x = x - rad;
			let circle = new Circle(x, y, rad);
			circle.draw(ctx);
			shapelist.push(circle);
		}
	}
	printData(shapelist);
}
function printData(shapelist) {
	var i;
	var x,y,w,h;
	var temp = [];
	var intersect = 0, inclusion=0;
	for(i=0; i<shapelist.length; i++){
		// Circulo
		//typeof retorna o tipo(str,boolean,objeto,etc...)
		// Chamada de função com argumentos em falta coloca esses argumentos como undefined
		if(typeof shapelist[i].w == 'undefined'){
			x = shapelist[i].x - shapelist[i].r;
			y = shapelist[i].y - shapelist[i].r;
			w = 2*shapelist[i].r;
			h = w;
			temp = calcData(shapelist,i,x,y,w,h);
			intersect+=temp[0];
			inclusion+=temp[1];
		}
		//Retangulo
		else{
			x = shapelist[i].x;
			y = shapelist[i].y;
			w = shapelist[i].w;
			h = shapelist[i].h;
			temp = calcData(shapelist,i,x,y,w,h);
			intersect+=temp[0];
			inclusion+=temp[1];
		}
	}
	console.log("Numero de interseções: " + intersect);
	console.log("Numero de inclusões: " + inclusion);

}
function calcData(shapelist,i,x,y,w,h) {
	var j;
	var x2,y2,w2,h2;
	var intersect=0,inclusion=0;
	var total=[];
	for(j=i+1; j<shapelist.length; j++){
		if(typeof shapelist[j].w == 'undefined'){
			x2 = shapelist[j].x - shapelist[j].r;
			y2 = shapelist[j].y - shapelist[j].r;
			w2 = 2*shapelist[j].r;
			h2 = w2;
		}
		else{
			x2 = shapelist[j].x;
			y2 = shapelist[j].y;
			w2 = shapelist[j].w;
			h2 = shapelist[j].h;
		}
		// Inclusão da fig 2 na 1
		if(((x>x2) && (y>y2) && (x+w<x2+w2) && (y+h<y2+h2))){
			inclusion++;
		}
		// Inclusão da fig 1 na 2
		else if(((x2>x) && (y2>y) && (x2+w2<x+w) && (y2+h2<y+h))){
			inclusion++;
		}
		// Interseção
		else if(!((x>x2+w2) || (y>y2+h2) || (x+w<x2) || (y+h<y2))){
			intersect++;
		}
	}
	total.push(intersect);
	total.push(inclusion);
	return total;
}
