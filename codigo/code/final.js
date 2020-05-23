"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var voltar = document.getElementById("sair");
    var creditos = document.getElementById("creditos");

    voltar.addEventListener("click" , voltarClikHandler);
    creditos.addEventListener("click" , creditosClickHandler );

}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}

function creditosClickHandler(ev) {
    parent.window.postMessage("creditos", "*");

}