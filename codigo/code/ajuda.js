"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var voltar = document.getElementById("voltar");

    voltar.addEventListener("click", voltarClickHandler);

}

function voltarClickHandler(ev) {

    parent.window.postMessage("voltarMenuPrincipal", "*");

}