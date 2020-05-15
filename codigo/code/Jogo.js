"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var spArray;
    canvas.addEventListener("initend", initEndHandler);
    init(ctx);  //carregar todos os componentes

}

function init(ctx) {
    nLoad = 0;
    var totLoad = 4;
    var spArray = new Array(totLoad);

    //carregar imagens e criar sprites
    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image();

    img.addEventListener("load", imgLoadedHandler);
    img.id="car";
    img.src = "";  //dá ordem de carregamento da imagem

    img2.addEventListener("load" , imgLoadedHandler);
    img2.id= "turbo";
    img2.src = "resources/turboBig.png";


    var som = new Audio('resources/turbo.mp3');


    function imgLoadedHandler(ev)
    {
        var img = ev.target;
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        if(img.id === "car")
            spArray[0] = new SpriteImage(0, 0, Math.round(nw/4), Math.round(nh/4), 1, false, img);
        else
            spArray[1] = new SpriteImage(300, 15, Math.round(nw), Math.round(nh), 1, true, img);

        nLoad++;

        if (nLoad === totLoad)
        {
            var ev2 = new Event("initend");
            ev2.spArray = spArray;
            ev2.som=som;
            ctx.canvas.dispatchEvent(ev2);
        }

    }
}


}