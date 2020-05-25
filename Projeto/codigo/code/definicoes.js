"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {

    var soundOn = document.getElementById("soundOn");
    var soundOff = document.getElementById("soundOff");
    var musicOn = document.getElementById("musicOn");
    var musicOff = document.getElementById("musicOff");
    var voltar = document.getElementById("voltar");

    inicializa();

    soundOn.addEventListener("click" , soundOnClikHandler );
    soundOff.addEventListener("click" , soundOffClikHandler );
    musicOn.addEventListener("click" , musicOnClikHandler);
    musicOff.addEventListener("click" , musicOffClikHandler);
    voltar.addEventListener("click" , voltarClikHandler);




}

function inicializa() {
    soundOff.style.filter = "grayscale(100%)";
    musicOff.style.filter = "grayscale(100%)";


}


function soundOnClikHandler(ev) {

    soundOff.style.filter = "grayscale(100%)";
    soundOn.style.filter = "none";
}

function soundOffClikHandler(ev) {
    soundOff.style.filter = "none";
    soundOn.style.filter = "grayscale(100%)";

}

function musicOnClikHandler(ev) {
    musicOn.style.filter = "none";
    musicOff.style.filter = "grayscale(100%)";
    sessionStorage.setItem("musica", 1);
}

function musicOffClikHandler(ev) {
    musicOn.style.filter = "grayscale(100%)";
    musicOff.style.filter = "none";
    sessionStorage.setItem("musica", 0);
}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}
