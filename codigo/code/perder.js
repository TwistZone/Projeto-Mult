"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var sair = document.getElementById("sair");
    var recomecar = document.getElementById("recomecar");

    sair.addEventListener("click" , voltarClikHandler);
    recomecar.addEventListener("click" , recomecarClickHandler );

}

function sairClikHandler(ev) {
    parent.window.postMessage("sair", "*");
}

function recomecarClickHandler(ev) {
    parent.window.postMessage("jogar", "*");

}