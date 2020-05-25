"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var sair = document.getElementById("sair");
    var creditos = document.getElementById("creditos");

    sair.addEventListener("click" , sairClikHandler);
    creditos.addEventListener("click" , creditosClickHandler );

}

function sairClikHandler(ev) {
    parent.window.postMessage("sair", "*");
}

function creditosClickHandler(ev) {
    parent.window.postMessage("creditosJogo", "*");

}