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
    var musica = document.getElementById("audio");

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
    soundOff.style.cursor = "pointer";
    musicOff.style.cursor = "pointer";
    musicOn.style.cursor = "pointer";
    soundOn.style.cursor = "pointer";
    voltar.style.cursor="pointer";


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
}

function musicOffClikHandler(ev) {
    musicOn.style.filter = "grayscale(100%)";
    musicOff.style.filter = "none";
}

function voltarClikHandler(ev) {
}