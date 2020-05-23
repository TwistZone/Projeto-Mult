"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {


    var voltar = document.getElementById("sair");
    var jogar = document.getElementById("recomecar");

    voltar.addEventListener("click" , voltarClikHandler);
    jogar.addEventListener("click" , recomecarClickHandler );

}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}

function recomecarClickHandler(ev) {
    parent.window.postMessage("escolheJogador", "*");

}