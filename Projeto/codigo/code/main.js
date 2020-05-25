"use strict";
//Site do autor da música: © https://tobyfox.bandcamp.com/
//Com os devidos créditos

(function()
{
    window.addEventListener("load", main);
}());


function main()
{
    window.addEventListener("message", function (e) {
        if(e.data === "voltarMenuPrincipal")
            voltarMenuPrincipal(e) ;
        else if(e.data === "jogar")
            jogar(e);
        else if(e.data ==="escolheJogador")
            escolheJogador(e);
        else if(e.data === "conquistas")
            conquistas(e);
        else if(e.data === "definicoes")
            definicoes(e);
        else if (e.data === "ajuda")
            ajuda(e);
        else if(e.data === "creditos")
            creditos(e);
        else if(e.data === "menuJogo")
            menujogo(e);
        else if(e.data === "perder")
            perder(e);
        else if(e.data === "ganhar")
            ganhar(e);
        else if(e.data === "final"){
            final(e);
        }else if(e.data === "definicoesJogo"){
            definicoesJogo(e);
        }else if(e.data === "ajudaJogo"){
            ajudaJogo(e);
        }else if(e.data === "creditosJogo"){
            creditosJogo(e);
        }else if(e.data === "continuar"){
            continuar(e);
        }else if(e.data === "sair")
            window.close();
        else
            console.log("unknown message");
    });

    showPage("menuPrincipal");


    sessionStorage.setItem("musica", 1);


    //sessionStorage.setItem("nivel", nivel);
}


function showPage(menu) {

    var frm = document.getElementsByTagName("iframe")[0];
    frm.src = menu + ".html";

}

//não é necessário (excepto se páginas diferentes tivessem zonas de navegação diferentes)
function hidePage(pageNum) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src = "";
}

function voltarMenuPrincipal(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("menuPrincipal");
}

function jogar(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;
    //sessionStorage.setItem("nivel", nivel);
    //hidePage(pageNum);
    sessionStorage.setItem("nivel", 0);
    showPage("game");
}





function escolheJogador(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src ;

    //hidePage(pageNum);
    showPage("escolheJogador");

}
function conquistas(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("conquistas");
}
function definicoes(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("definicoes");

}
function ajuda(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("ajuda");
}
function creditos(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("creditos");
}

function menujogo(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("menuJogo");

}

function perder(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;
    //hidePage(pageNum);
    sessionStorage.setItem("nivel", 0);
    showPage("perder");
}

function ganhar(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;
    //hidePage(pageNum);
    showPage("ganhar");
}
function final(ev ) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;
    //hidePage(pageNum);
    sessionStorage.setItem("nivel", 0);
    showPage("final");
}

function definicoesJogo(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("definicoesJogo");

}
function ajudaJogo(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("ajudaJogo");
}
function creditosJogo(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;

    //hidePage(pageNum);
    showPage("creditosJogo");
}

function continuar(ev) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src;
    //hidePage(pageNum);
    sessionStorage.setItem("nivel", +sessionStorage.getItem("nivel") +1);
    console.log(sessionStorage.getItem("nivel"));
    showPage("game");
}