"use strict";


const opacDisabled = 0.3;
const imgFolder = "../resources/image/";
const txtFolder = "../resources/text/";
const SlideOff=0;
const SlideOn=1;

(function() {
	window.addEventListener("load", main);
}());

function main() {
	var nrPage = 1;
	var intervalo = 0;
	var lista = [nrPage,SlideOff,intervalo];

	var photo=document.getElementById("photo");
	photo.src=imgFolder +"01.jpg";

	var text=document.getElementById("text");
	text.src=txtFolder +"01.txt";

	var audio = document.getElementById("audio");

	var firstBtn = document.getElementsByTagName("button")[0];
	var backBtn = document.getElementsByTagName("button")[1];
	var nextBtn = document.getElementsByTagName("button")[2];
	var lastBtn = document.getElementsByTagName("button")[3];
	var slideShowBtn = document.getElementsByTagName("button")[4];
	var soundBtn = document.getElementsByTagName("button")[5];
	adbotoes(lista);

	var btnfunc = function(ev){
		lista = BtnFunction(ev,lista);
	};

	firstBtn.addEventListener("click", btnfunc);
	backBtn.addEventListener("click", btnfunc);
	nextBtn.addEventListener("click", btnfunc);
	backBtn.addEventListener("click", btnfunc);
	lastBtn.addEventListener("click", btnfunc);
	slideShowBtn.addEventListener("click", btnfunc);

	audio.play().catch(function(){
	});
	soundBtn.addEventListener("click",function(ev){
		soundBtnHandler(ev,audio,soundBtn);
	},true);

	var escape=document.addEventListener("keydown",function(ev){
		lista = EscapeListener(ev,lista);
	},true);
}

function adbotoes(lista){
	if(lista[0]==1 && lista[1]==SlideOff){	//primeira pagina
		lastBtn.disabled = false;
		nextBtn.disabled = false;

		lastBtn.style.opacity = 1;
		nextBtn.style.opacity = 1;

		firstBtn.disabled = true;
		backBtn.disabled = true;
		firstBtn.style.opacity = opacDisabled;
		backBtn.style.opacity = opacDisabled;

		firstBtn.style.cursor = "default";
		backBtn.style.cursor = "default";
		nextBtn.style.cursor = "pointer";
		lastBtn.style.cursor = "pointer";
		slideShowBtn.style.cursor = "pointer";
	}else if(lista[0]==16  && lista[1]==SlideOff){	//ultima pagina
		firstBtn.disabled = false;
		backBtn.disabled = false;
		firstBtn.style.opacity = 1;
		backBtn.style.opacity = 1;

		lastBtn.disabled = true;
		nextBtn.disabled = true;

		lastBtn.style.opacity = opacDisabled;
		nextBtn.style.opacity = opacDisabled;
		lastBtn.style.cursor = "default";
		nextBtn.style.cursor = "default";
		firstBtn.style.cursor = "pointer";
		backBtn.style.cursor = "pointer";
		slideShowBtn.style.cursor = "pointer";
	}
	else if(lista[1]==SlideOn ){	//ao clicar no botao de slide mode
		lastBtn.disabled = true;
		nextBtn.disabled = true;
		firstBtn.disabled = true;
		backBtn.disabled = true;
		slideShowBtn.disabled = true;

		lastBtn.style.opacity = opacDisabled;
		nextBtn.style.opacity = opacDisabled;
		firstBtn.style.opacity = opacDisabled;
		backBtn.style.opacity = opacDisabled;
		slideShowBtn.style.opacity = opacDisabled;

		lastBtn.style.cursor = "default";
		nextBtn.style.cursor = "default";
		firstBtn.style.cursor = "default";
		backBtn.style.cursor = "default";
		slideShowBtn.style.cursor = "default";
	}
	else if(lista[0]!=1 &&lista[0]!=16  && lista[1]==SlideOff){	//paginas a meio
		firstBtn.disabled = false;
		backBtn.disabled = false;
		lastBtn.disabled = false;
		nextBtn.disabled = false;

		firstBtn.style.opacity = 1;
		backBtn.style.opacity = 1;
		lastBtn.style.opacity = 1;
		nextBtn.style.opacity = 1;

		lastBtn.style.cursor = "pointer";
		nextBtn.style.cursor = "pointer";
		firstBtn.style.cursor = "pointer";
		backBtn.style.cursor = "pointer";
		slideShowBtn.style.cursor = "pointer";
	}

}

function soundBtnHandler(ev,audio,soundBtn) {
	if (audio.muted == true) {
		soundBtn.innerHTML = "<img src = '../resources/extra/soundOnBtn.png'>";
		audio.play().catch(function(){
		});
		audio.loop = true;
		audio.muted=false;
	}
	else
	{
		soundBtn.innerHTML = "<img src = '../resources/extra/soundOffBtn.png'>";
		audio.muted=true;
	}
}

function BtnFunction(ev,lista) {
	var id = ev.currentTarget.id;
	if (id=="firstBtn"){
		lista[0]=1;
		MudaPag(lista);
		adbotoes(lista);
	}
	else if(id =="backBtn"){
		lista[0]--;
		MudaPag(lista);
		adbotoes(lista);
	}
	else if (id =="nextBtn"){
		lista[0]++;;
		MudaPag(lista);
		adbotoes(lista);
	}
	else if(id =="lastBtn"){
		lista[0] = 16;
		adbotoes(lista);
		MudaPag(lista);
	}
	else if (id =="slideShowBtn"){
		lista[1]=SlideOn;
		adbotoes(lista);


		var intervalo = setInterval(function(){
			if(lista[0]==16){
				lista[0]=1;
			}
			else{
				lista[0]++;
			}
			MudaPag(lista);
		},2000);
		lista[2]=intervalo;
	}
	return lista;
}

function MudaPag(lista){
	if (lista[0] < 10){
		var source = imgFolder + "0" + lista[0].toString() + ".jpg";
		var texto = txtFolder + "0" + lista[0].toString()  + ".txt";
	}
	else{
		var source = imgFolder + lista[0].toString()  + ".jpg";
		var texto = txtFolder + lista[0].toString() + ".txt";
	}
	photo.src = source;
	text.src = texto;
}

function EscapeListener(ev,lista) {
	if (ev.code == "Escape"  && lista[1] == SlideOn){
		clearInterval(lista[2]);
		lista[2]=0;
		slideShowBtn.style.opacity =1;
		slideShowBtn.disabled = false;
		lista[1] = SlideOff;

		adbotoes(lista);
	}
	return lista;
}
