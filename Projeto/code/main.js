"use strict";

function showPage(pageName) {

    //var frm = document.getElementsByTagName("iframe")[0];
    //frm.src = pageName + ".html";

    if (pageName === totPages) {
        var btn = document.getElementsByTagName("button")[0];
        btn.style.visibility = "hidden";
        btn.removeEventListener("click", btnNextPageHandler); //remover clicks no botão de navegação
    }

}

function btnNextPageHandler(ev) {
    //var frm = document.getElementsByTagName("iframe")[0];
    //var frmName = frm.src;
    var pageName = Number(frmName.charAt(frmName.length - 6)); //e.g., page2.html --> get the number 2

    hidePage(pageNum);
    showPage(pageNum + 1);
} 