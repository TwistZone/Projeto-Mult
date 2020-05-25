"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var Escolhida;
    //carrega a 1 imagem
    var jogadorAtual=document.getElementById("jogadorAtual");
    jogadorAtual.src= "../../assets/spritesFctuc/normalR.png";


    var voltar = document.getElementById("voltar");
    var vamos = document.getElementById("vamos");

    var fctuc = document.getElementById("fctuc");
    var fluc =document.getElementById("Letras");
    var fmuc = document.getElementById("Medicina");
    var fduc = document.getElementById("Direito");
    var ffuc = document.getElementById("Farmacia");
    var feuc = document.getElementById("Economia");
    var fpceuc = document.getElementById("Psicologia");
    var fcdefuc = document.getElementById("Desporto");
    Escolhida = fctuc.id;

    var nav = function (ev) {
        Escolhida = nextI(ev)
        sessionStorage.setItem("Escolhida", Escolhida);
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

function nextI(ev) {
    var id = ev.currentTarget.id;
    if(id === "fctuc"){
        jogadorAtual.src= "../../assets/spritesFctuc/normalR.png";
    }else if(id==="Letras"){
        jogadorAtual.src= "../../assets/spritesLetras/normalR.png";
    }else if(id==="Medicina"){
        jogadorAtual.src= "../../assets/spritesMedicina/normalR.png";
    }else if(id==="Direito"){
        jogadorAtual.src= "../../assets/spritesDireito/normalR.png";
    }else if(id==="Farmacia"){
        jogadorAtual.src= "../../assets/spritesFarmacia/normalR.png";
    }else if(id==="Economia"){
        jogadorAtual.src= "../../assets/spritesEconomia/normalR.png";
    }else if(id==="Psicologia"){
        jogadorAtual.src= "../../assets/spritesPsicologia/normalR.png";
    }else if(id==="Desporto"){
        jogadorAtual.src= "../../assets/spritesDesporto/normalR.png";
    }

    return id;
}