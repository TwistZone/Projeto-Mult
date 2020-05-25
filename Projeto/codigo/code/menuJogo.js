"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var sair = document.getElementById("sair");
    var definicoes = document.getElementById("definicoes");
    var ajuda = document.getElementById("ajuda");
    var retomar = document.getElementById("retomar");

    ajuda.addEventListener("click" , ajudaClickHandler);
    sair.addEventListener("click" , sairClikHandler);
    definicoes.addEventListener("click" , definicoesClickHandler);
    retomar.addEventListener("click" , retomarHandler);




}
function retomarHandler(ev) {
    parent.window.postMessage('jogar' , "*");

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
