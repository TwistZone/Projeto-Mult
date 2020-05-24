"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {

    var sair = document.getElementById("sair");

    sair.addEventListener("click" , sairClikHandler);

}

function sairClikHandler(ev) {
    parent.window.postMessage("sair", "*");
}

/*TODO adicionar o trigger para ir para o proximo nivel, tem de ser feito ao implementar a parte do gameplay*/