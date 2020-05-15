"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var Escolhida;
    //carrega a 1 imagem
    var jogadorAtual=document.getElementById("jogadorAtual");
    jogadorAtual.src= "../../assets/spritesFctuc/normal.png";


    var voltar = document.getElementById("voltar");
    var vamos = document.getElementById("vamos");

    var fctuc = document.getElementById("fctuc");
    var fluc =document.getElementById("fluc");
    var fmuc = document.getElementById("fmuc");
    var fduc = document.getElementById("fduc");
    var ffuc = document.getElementById("ffuc");
    var feuc = document.getElementById("feuc");
    var fpceuc = document.getElementById("fpceuc");
    var fcdefuc = document.getElementById("fcdefuc");

    Escolhida = fctuc.id;

    var nav = function (ev) {
        Escolhida = nextI(ev ,Escolhida )
    }

    fctuc.addEventListener("click" ,nav);
    fluc.addEventListener("click" , nav);
    fmuc.addEventListener("click" , nav);
    fduc.addEventListener("click" , nav);
    ffuc.addEventListener("click" ,nav);
    feuc.addEventListener("click" ,nav);
    fpceuc.addEventListener("click" , nav);
    fcdefuc.addEventListener("click" , nav);


    voltar.addEventListener("click" , voltarClikHandler);
    vamos.addEventListener("click" , vamosClickHandler);


}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}
function vamosClickHandler(ev) {
    parent.window.postMessage("jogar", "*");
}

function nextI(ev ,Escolhida) {
    console.log("entrei");
    var id = ev.currentTarget.id;
    if(id === "fctuc"){
        jogadorAtual.src= "../../assets/spritesFctuc/normal.png";
    }else if(id==="fluc"){
        jogadorAtual.src= "../../assets/spritesLetras/normal.png";
    }else if(id==="fmuc"){
        jogadorAtual.src= "../../assets/spritesMedicina/normal.png";
    }else if(id==="fduc"){
        jogadorAtual.src= "../../assets/spritesDireito/normal.png";
    }else if(id==="ffuc"){
        jogadorAtual.src= "../../assets/spritsFarmacia/normal.png";
    }else if(id==="feuc"){
        jogadorAtual.src= "../../assets/spritesEconomia/normal.png";
    }else if(id==="fpceuc"){
        jogadorAtual.src= "../../assets/spritesPsicologia/normal.png";
    }else if(id==="fcdefuc"){
        jogadorAtual.src= "../../assets/spritesDesporto/normal.png";
    }

    return id;
}