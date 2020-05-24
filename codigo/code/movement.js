"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  //get content
    var finoArray;

    timer();
    //var personagem = new Personagem("Psicologia", "right");
    //var charArray = personagem.sprites;

    canvas.addEventListener("initend", initEndHandler);
    init(ctx, "psicologia");  //carregar todos os componentes


    function initEndHandler(ev)
    {
        window.addEventListener('keydown',kdh);

        finoArray = ev.finoArray;

        //iniciar a animação
        startAnim(ctx, finoArray);
    }

    var kdh=function(ev){
        canvasKeyDownHandler(ev);
    }


}
function canvasKeyDownHandler(ev,spArray) {
    switch (ev.code) {
        case("Escape"):
            console.log("escape");
            parent.window.postMessage("menuJogo", "*");
    }
}


function init(ctx,id) {
    //carrega todas as sprites da personagem escolhida anteriormente
    var nLoad = 0;

    var finoArray = new Array(2);


    var finoCheio = new Image();
    finoCheio.addEventListener("load" , finoLoadedHandler);
    finoCheio.id= "finoCheio";
    finoCheio.src = "../../assets/random/botoes/canecacheia.png";


    var finoMeio = new Image();
    finoMeio.addEventListener("load" , finoLoadedHandler);
    finoMeio.id = "finoMeio";
    finoMeio.src = "../../assets/random/botoes/canecaMeia.png";

    //var som to add later



    function finoLoadedHandler(ev) {
        var fino = ev.target;
        var nw = fino.naturalWidth;
        var nh = fino.naturalHeight;

        if(fino.id === "finoCheio"){
            finoArray[0]= new FinoImage(Math.round(nw/2), Math.round(nh/2) , fino);
        }else
            finoArray[1]= new FinoImage(nw/2, nh/2,fino);
        nLoad++;
        if (nLoad === 2) {
            var ev2 = new Event("initend");
            ev2.finoArray = finoArray;
            ctx.canvas.dispatchEvent(ev2);
        }
    }
}


function draw(ctx , fino , n)
{
    var x = 25;
    var cy= 50;
    for (let i = 0; i < n; i++)
    {
        fino.draw(ctx ,x, cy);
        if(i  === 4)
            x += 200;
        else
            x +=40;
    }
}

function startAnim(ctx, finoArray)
{
    draw(ctx,finoArray[0] , 10);
    //animLoop(ctx, finoArray);
}


function animLoop(ctx, finoArray)
{
    var al = function(time)
    {
        animLoop(ctx, finoArray);
    }
    var reqID = window.requestAnimationFrame(al);

    render(ctx, finoArray, reqID );

}

function render(ctx, finoArray,reqID)
{
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var finoCheio = finoArray[0];
    var finoMeio = finoArray[1];

    //apagar canvas
    ctx.clearRect(0, 0, cw, ch);


    //redesenhar sprites
    draw(ctx, finoArray);

}

function timer(){
    var sec = 90;
    var timer = setInterval(function(){
        document.getElementById('clock').innerHTML= sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }

    }, 1000);
}
