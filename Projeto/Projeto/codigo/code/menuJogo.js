"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var sair = document.getElementById("sair");
    var definicoes = document.getElementById("definicoes");
    var ajuda = document.getElementById("ajuda");

    ajuda.addEventListener("click" , ajudaClickHandler);
    sair.addEventListener("click" , sairClikHandler);
    definicoes.addEventListener("click" , definicoesClickHandler);


}

function sairClikHandler(ev) {
    parent.window.postMessage("sair", "*");
}

function ajudaClickHandler(ev) {
    parent.window.postMessage("ajudaJogo", "*");
}

function definicoesClickHandler(ev) {
    parent.window.postMessage("definicoesJogo", "*");
}
