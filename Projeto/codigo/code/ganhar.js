"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {

    var sair = document.getElementById("sair");
    var continuar = document.getElementById("continuar");

    sair.addEventListener("click" , sairClikHandler);
    continuar.addEventListener("click" , continuarHandler);

}

function sairClikHandler(ev) {
    parent.window.postMessage("sair", "*");
}

function continuarHandler(ev) {
    parent.window.postMessage("continuar" , "*");

}

/*TODO adicionar o trigger para ir para o proximo nivel, tem de ser feito ao implementar a parte do gameplay*/