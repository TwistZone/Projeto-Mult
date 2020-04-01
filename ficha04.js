"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var spArray;  //sprite array
	var som;

	canvas.addEventListener("initend", initEndHandler);
	init(ctx);  //carregar todos os componentes

	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		//instalar listeners do rato	
		ctx.canvas.addEventListener("click", cch);
		
		spArray = ev.spArray;
		som =ev.som;
		//iniciar a animação
		startAnim(ctx, spArray, som);
	}

	var cch = function(ev)
	{
		canvasClickHandler(ev, ctx, spArray , som);
	}	
}


//init: carregamento de componentes
function init(ctx)
{
	var nLoad = 0;
	var totLoad = 2;
	var spArray = new Array(totLoad);

	//estilos de texto
	ctx.fillStyle = "#993333";
	ctx.font = "12px helvetica";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center";  

	//carregar imagens e criar sprites
	var img = new Image();
	var img2 = new Image();

	img.addEventListener("load", imgLoadedHandler);
	img.id="car";
	img.src = "resources/car.png";  //dá ordem de carregamento da imagem

	img2.addEventListener("load" , imgLoadedHandler);
	img2.id= "turbo";
	img2.src = "resources/turboBig.png";


	var audio = new Audio('resources/turbo.mp3');


	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		//spArray[0]
		if(img.id === "car")
			spArray[0] = new SpriteImage(0, 0, nw/4, nh/4, 1, false, img);
		else
			spArray[1] = new SpriteImage(250, 2, nw, nh, 1, true, img);

		nLoad++;

		if (nLoad === totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ev2.som=audio;
			ctx.canvas.dispatchEvent(ev2);
		}

	}
}


//iniciar animação
function startAnim(ctx, spArray , som)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray , som,0);
}


//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
	}
}


//apagar sprites
function clear(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}
}


//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
var auxDebug = 0;  //eliminar
function animLoop(ctx, spArray , tempo_ini ,som, temp_atual)
{
	var al = function(time)
	{
		if(tempo_ini == 0)
			tempo_ini =time;

		animLoop(ctx, spArray , tempo_ini ,som,time );
	}
	var reqID = window.requestAnimationFrame(al);

	render(ctx, spArray, reqID , som,temp_atual-tempo_ini);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID,som, tempo)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;
	var sp = spArray[0];
	var turbo = spArray[1];

	if(sp.intersecaoTurbo(turbo)){
		sp.speed +=2;
		som.play();
	}

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	//animar sprites
	if (sp.x + sp.width < cw)
	{
		if (sp.x + sp.width + sp.speed > cw)
			sp.x = cw - sp.width;
		else
			sp.x = sp.x + sp.speed;		
	}
	else
	{
		window.cancelAnimationFrame(reqID);
		//podemos fazer clickable
		sp.clickable = true;
	}

	//redesenhar sprites e texto
	var txt = "Time: " + Math.trunc(tempo)+ " msec";
	ctx.fillText(txt, cw/2, ch);
	draw(ctx, spArray);
}


//-------------------------------------------------------------
//--- interacção com o rato
//-------------------------------------------------------------
function canvasClickHandler(ev, ctx, spArray,som)
{
	var sp = spArray[0];
	var turbo = spArray[1];

	if (sp.clickedBoundingBox(ev , ctx))
	{
		sp.reset(ev, ctx);
		animLoop(ctx, spArray ,som, 0);
	}
	else if(turbo.clickedBoundingBox(ev , ctx)){
		sp.reset(ev, ctx);
		animLoop(ctx, spArray ,som, 0);
	}
}