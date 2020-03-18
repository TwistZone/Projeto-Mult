"use strict";


const opacDisabled = 0.3;
const opacEnabled=1;
const imgFolder = "../resources/image/";
const txtFolder = "../resources/text/";
const SlideOff=0;
const SlideOn=1;
const firstImage=1;
const lastImage=16;

(function() {
	window.addEventimageListener("load", main);
}());

function main() {
	var nrPage = 1;
	var intervalo = 0;
	var imageList = [nrPage,SlideOff,intervalo];

	var photo=document.getElementById("photo");
	photo.src=imgFolder +"01.jpg";

	var text=document.getElementById("text");
	text.src=txtFolder +"01.txt";

	var audio = document.getElementById("audio");

	let firstBtn = document.getElementsByTagName("button")[0];
	let backBtn = document.getElementsByTagName("button")[1];
	let nextBtn = document.getElementsByTagName("button")[2];
	let lastBtn = document.getElementsByTagName("button")[3];
	let slideShowBtn = document.getElementsByTagName("button")[4];
	let soundBtn = document.getElementsByTagName("button")[5];
	let buttonimageList= [firstBtn,backBtn,nextBtn,lastBtn,slideShowBtn];
	addButtons(imageList,buttonimageList);

	var btnFunc = function(ev){
		imageList = btnFunction(ev,imageList);
	};

	firstBtn.addEventimageListener("click", btnFunc);
	backBtn.addEventimageListener("click", btnFunc);
	nextBtn.addEventimageListener("click", btnFunc);
	backBtn.addEventimageListener("click", btnFunc);
	lastBtn.addEventimageListener("click", btnFunc);
	slideShowBtn.addEventimageListener("click", btnFunc);

	audio.play().catch(function(){
	});
	soundBtn.addEventimageListener("click",function(ev){
		soundBtnHandler(ev,audio,soundBtn);
	},true);
	var escape=document.addEventimageListener("keydown",function(ev){
		imageList = escapeimageListener(ev,imageList,slideShowBtn);
	},true);
}

function addButtons(imageList,buttonimageList){
	let firstBtn=buttonimageList[0];
	let backBtn=buttonimageList[1];
	let nextBtn=buttonimageList[2];
	let lastBtn=buttonimageList[3];
	let slideShowBtn=buttonimageList[4];
	
	if(imageList[0]===firstImage && imageList[1]===SlideOff){	//primeira pagina
		lastBtn.disabled = false;
		nextBtn.disabled = false;

		lastBtn.style.opacity = opacEnabled;
		nextBtn.style.opacity = opacEnabled;

		firstBtn.disabled = true;
		backBtn.disabled = true;
		firstBtn.style.opacity = opacDisabled;
		backBtn.style.opacity = opacDisabled;

		firstBtn.style.cursor = "default";
		backBtn.style.cursor = "default";
		nextBtn.style.cursor = "pointer";
		lastBtn.style.cursor = "pointer";
		slideShowBtn.style.cursor = "pointer";
	}else if(imageList[0]===lastImage  && imageList[1]===SlideOff){	//ultima pagina
		firstBtn.disabled = false;
		backBtn.disabled = false;
		firstBtn.style.opacity = opacEnabled;
		backBtn.style.opacity = opacEnabled;

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
	else if(imageList[1]===SlideOn ){	//ao clicar no botao de slide mode
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
	else if(imageList[0]!==firstImage &&imageList[0]!==lastImage  && imageList[1]===SlideOff){	//paginas a meio
		firstBtn.disabled = false;
		backBtn.disabled = false;
		lastBtn.disabled = false;
		nextBtn.disabled = false;

		firstBtn.style.opacity = opacDisabled;
		backBtn.style.opacity = opacEnabled;
		lastBtn.style.opacity = opacEnabled;
		nextBtn.style.opacity = opacEnabled;

		lastBtn.style.cursor = "pointer";
		nextBtn.style.cursor = "pointer";
		firstBtn.style.cursor = "pointer";
		backBtn.style.cursor = "pointer";
		slideShowBtn.style.cursor = "pointer";
	}

}

function soundBtnHandler(ev,audio,soundBtn) {
	if (audio.muted === true) {
		soundBtn.innerHTML = "<img src = '../resources/extra/soundOnBtn.png'>";
		audio.play().catch(function(){
		});
		audio.loop = true;
		audio.muted=false;
	}
	else
	{
		soundBtn.innerHTML = "<img src = '../resources/extra/soundOffBtn.png'>muted=false";
		audio.muted=true;
	}
}

function btnFunction(ev,imageList) {
	var id = ev.currentTarget.id;
	if (id==="firstBtn"){
		imageList[0]=1;
		changePage(imageList);
		addButtons(imageList);
	}
	else if(id ==="backBtn"){
		imageList[0]--;
		changePage(imageList);
		addButtons(imageList);
	}
	else if (id ==="nextBtn"){
		imageList[0]++;
		changePage(imageList);
		addButtons(imageList);
	}
	else if(id ==="lastBtn"){
		imageList[0] = lastImage;
		addButtons(imageList);
		changePage(imageList);
	}
	else if (id ==="slideShowBtn"){
		imageList[1]=SlideOn;
		addButtons(imageList);


		imageList[2]=setInterval(function () {
			if (imageList[0] === lastImage) {
				imageList[0] = firstImage;
			} else {
				imageList[0]++;
			}
			changePage(imageList);
		}, 2000);
	}
	return imageList;
}

function changePage(imageList){
	if (imageList[0] < 10){
		var source = imgFolder + "0" + imageList[0].toString() + ".jpg";
		var texto = txtFolder + "0" + imageList[0].toString()  + ".txt";
	}
	else{
		var source = imgFolder + imageList[0].toString()  + ".jpg";
		var texto = txtFolder + imageList[0].toString() + ".txt";
	}
	photo.src = source;
	text.src = texto;
}

function escapeimageListener(ev,imageList,slideShowBtn) {
	if (ev.code === "Escape"  && imageList[1] === SlideOn){
		clearInterval(imageList[2]);
		imageList[2]=0;
		slideShowBtn.style.opacity =opacEnabled;
		slideShowBtn.disabled = false;
		imageList[1] = SlideOff;

		addButtons(imageList);
	}
	return imageList;
}
