"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var jogar = document.getElementById("jogar");
    var conquistas = document.getElementById("conquistas");
    var definicoes = document.getElementById("definicoes");
    var ajuda = document.getElementById("ajuda");
    var creditos = document.getElementById("creditos");
    var sair = document.getElementById("sair");


    jogar.addEventListener("click" , jogarClickHandler );
    conquistas.addEventListener("click" , conquistasClickHandler);
    definicoes.addEventListener("click" , definicoesClickHandler);
    ajuda.addEventListener("click" , ajudaClickHandler);
    creditos.addEventListener("click" , creditosClickHandler);
    sair.addEventListener("click" , sairClickHandler);

}

function jogarClickHandler(ev) {
    parent.window.postMessage("escolheJogador", "*");

}

function conquistasClickHandler(ev) {
    parent.window.postMessage("conquistas", "*");

}

function definicoesClickHandler(ev) {
    parent.window.postMessage("definicoes", "*");
}

function ajudaClickHandler(ev) {
    //parent.window.postMessage("defincoes", "*");
}

function creditosClickHandler(ev) {
    parent.window.postMessage("creditos", "*");
}

function sairClickHandler(ev) {
    parent.window.postMessage("sair", "*");
}