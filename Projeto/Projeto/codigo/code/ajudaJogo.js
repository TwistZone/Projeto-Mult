"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var voltarJogo = document.getElementById("voltarJogo");

    voltarJogo.addEventListener("click", voltarJogoClickHandler);

}

function voltarJogoClickHandler(ev) {

    parent.window.postMessage("menuJogo", "*");

}