"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {

    var voltar = document.getElementById("voltar");

    voltar.addEventListener("click" , voltarClikHandler);

}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}
