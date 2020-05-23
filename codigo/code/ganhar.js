"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {

    var voltar = document.getElementById("sair");

    voltar.addEventListener("click" , voltarClikHandler);

}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}

/*TODO adicionar o trigger para ir para o proximo nivel, tem de ser feito ao implementar a parte do gameplay*/