"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var textoAtual=1;

    var texto=document.getElementById("texto");
    texto.src= "../../assets/conquistas/1.png";

    var voltar = document.getElementById("voltar");

    voltar.addEventListener("click" , voltarClikHandler);

    var anterior = document.getElementById("anterior");
    var proximo = document.getElementById("proximo");

    trataBotoes(textoAtual);

    console.log("tratou botoes");

    var nav=function (ev) {
        textoAtual = textoSeguinte(ev , textoAtual);
    }

    anterior.addEventListener("click" , nav);
    proximo.addEventListener("click" , nav);
}

function voltarClikHandler(ev) {
    parent.window.postMessage("voltarMenuPrincipal", "*");
}

function trataBotoes(textoAtual) {
    if(textoAtual === 1){
        //anterior nao disponivel
        anterior.disabled=true;
        anterior.style.filter = "grayscale(100%)";
        anterior.style.cursor = "default";

        //proximo disponivel
        proximo.disabled=false;
        proximo.style.filter = "none";
        proximo.style.cursor = "pointer";

    }else if(textoAtual === 8){
        //proximo nao disponivel
        proximo.disabled=true;
        proximo.style.filter = "grayscale(100%)";
        proximo.style.cursor = "default";

        //anterior disponivel
        anterior.disabled=false;
        anterior.style.filter = "none";
        anterior.style.cursor = "pointer";
    }
    else{
        //os dois disponiveis
        anterior.disabled=false;
        anterior.style.filter = "none";
        anterior.style.cursor = "pointer";

        proximo.disabled=false;
        proximo.style.filter = "none";
        proximo.style.cursor = "pointer";
    }
}

function mudaPag(textoAtual) {
    console.log("mudou pag");
    texto.src="../../assets/conquistas/"+textoAtual+".png";

    return 0;
}

function textoSeguinte(ev , textoAtual) {
    var id = ev.currentTarget.id;

    console.log(id);
    if(id === "proximo"){
        textoAtual++;
        mudaPag(textoAtual);
        trataBotoes(textoAtual);

    }else if(id === "anterior"){
        textoAtual--;
        mudaPag(textoAtual);
        trataBotoes(textoAtual);
    }

    return textoAtual;
}

