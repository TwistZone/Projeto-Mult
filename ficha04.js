"use strict";

(function()
{
    window.addEventListener("load", main);
}());


function main()
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var spArray;  //sprite array
    var som;

    canvas.addEventListener("initend", initEndHandler);
    init(ctx);  //carregar todos os componentes

    //funções locais para gestão de eventos
    function initEndHandler(ev)
    {
        //instalar listeners do rato
        ctx.canvas.addEventListener("click", cch);

        ctx.canvas.addEventListener("mousedown" ,mdh);
        ctx.canvas.addEventListener("mouseup",muh);
        ctx.canvas.addEventListener("mousemove" , mmh);
        window.addEventListener('keyup',kuh);
        window.addEventListener('keydown',kdh);
        spArray = ev.spArray;
        som=ev.som;
        //iniciar a animação
        startAnim(ctx, spArray, som);
    }

    var cch = function(ev)
    {
        canvasClickHandler(ev, ctx, spArray , som);
    }
    var mdh = function (ev) {
        canvasMouseDownHandler(ev ,spArray,ctx);
    }
    var muh = function (ev) {
        canvasMouseUpHandler(ev,spArray,ctx);
    }
    var mmh =function (ev) {
        canvasMouseMoveHandler(ev,spArray,ctx);
    }
    var kuh=function(ev){
        canvasKeyUpHandler(ev,spArray);
    }
    var kdh=function(ev){
        canvasKeyDownHandler(ev,spArray);
    }
}


//init: carregamento de componentes
function init(ctx)
{
    var nLoad = 0;
    var totLoad = 2;
    var spArray = new Array(totLoad);

    //estilos de texto
    ctx.fillStyle = "#993333";
    ctx.font = "12px helvetica";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";

    //carregar imagens e criar sprites
    var img = new Image();
    var img2 = new Image();

    img.addEventListener("load", imgLoadedHandler);
    img.id="car";
    img.src = "resources/car.png";  //dá ordem de carregamento da imagem

    img2.addEventListener("load" , imgLoadedHandler);
    img2.id= "turbo";
    img2.src = "resources/turboBig.png";


    var som = new Audio('resources/turbo.mp3');


    function imgLoadedHandler(ev)
    {
        var img = ev.target;
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        //spArray[0]
        if(img.id === "car")
            spArray[0] = new SpriteImage(0, 0, nw/4, nh/4, 1, false, img);
        else
            spArray[1] = new SpriteImage(300, 15, nw, nh, 1, true, img);

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


//iniciar animação
function startAnim(ctx, spArray ,som)
{
    draw(ctx, spArray);
    animLoop(ctx, spArray , som,0,0);
}


//desenhar sprites
function draw(ctx, spArray)
{
    var dim = spArray.length;

    for (let i = 0; i < dim; i++)
    {
        spArray[i].draw(ctx);
    }
}


//apagar sprites
function clear(ctx, spArray)
{
    var dim = spArray.length;

    for (let i = 0; i < dim; i++)
    {
        spArray[i].clear(ctx);
    }
}


//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------

function animLoop(ctx, spArray ,som,temp_ini, temp_atual)
{
    var al = function(time)
    {
        if(temp_ini == 0)
            temp_ini =time;

        animLoop(ctx, spArray , som,temp_ini,time);
    }
    var reqID = window.requestAnimationFrame(al);

    render(ctx, spArray, reqID , som,temp_atual-temp_ini);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID,som, tempo)
{
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var sp = spArray[0];
    var turbo = spArray[1];

    if(sp.intersecaoTurbo(sp,turbo)){
        som.play();
        sp.speed +=2;
        turbo.clear(ctx);
        turbo.x = cw/2;
        turbo.y= ch/2;
    }

    //apagar canvas
    ctx.clearRect(0, 0, cw, ch);

    //animar sprites
    if (sp.x + sp.width < cw)
    {
        if (sp.x + sp.width + sp.speed > cw)
            sp.x = cw - sp.width;
        else
            sp.x = sp.x + sp.speed;
    }
    else
    {
        window.cancelAnimationFrame(reqID);
        //podemos fazer clickable
        sp.clickable = true;
    }
    if(turbo.left && turbo.x > 0){
        turbo.x -= turbo.speed;
    }
    else if(turbo.right && turbo.x < cw){
        turbo.x += turbo.speed;
    }
    else if(turbo.up && turbo.y > 0){
        turbo.y -= turbo.speed;
    }
    else if(turbo.down && turbo.y < ch){
        turbo.y += turbo.speed;
    }
    //redesenhar sprites e texto
    var txt = "Time: " + Math.round(tempo)+ " msec";
    ctx.fillText(txt, cw/2, ch);
    draw(ctx, spArray);
}


//-------------------------------------------------------------
//--- interacção com o rato
//-------------------------------------------------------------
function canvasClickHandler(ev, ctx, spArray,som)
{
    var sp = spArray[0];
    var turbo = spArray[1];

    if (sp.clickedBoundingBox(ev , ctx))
    {
        sp.reset(ev, ctx);
        turbo.reset(ev,ctx);
        animLoop(ctx, spArray ,som, 0,0);
    }
    else if(turbo.clickedBoundingBox(ev , ctx)){
        sp.reset(ev, ctx);
        turbo.reset(ev,ctx);
        animLoop(ctx, spArray ,som, 0,0);
    }
}

function canvasMouseDownHandler(ev ,spArray,ctx) {
    var sp= spArray[1];
    if(sp.draggable && sp.clickedBoundingBox(ev ,ctx)){
        sp.mouseDown = true;
        //guarda dos valores do mouseoffset
        sp.mouseOffsetX = ev.offsetX-sp.x;
        sp.mouseOffsetY = ev.offsetY -sp.y;

    }
}

function canvasMouseUpHandler(ev ,spArray,ctx) {
    var sp= spArray[1];
    if(sp.draggable){
        sp.mouseDown=false;
    }

}

function canvasMouseMoveHandler(ev,spArray,ctx) {
    var sp=spArray[1];
    if(sp.draggable && sp.mouseDown){
        sp.x = ev.offsetX -sp.mouseOffsetX;
        sp.y=ev.offsetY-sp.mouseOffsetY;
    }

}
function canvasKeyDownHandler(ev,spArray) {
    let sp = spArray[1];
    switch (ev.code) {
        case "ArrowLeft":
            sp.left = true;
            break;
        case "ArrowRight":
            sp.right = true;
            break;
        case "ArrowUp":
            sp.up = true;
            break;
        case "ArrowDown":
            sp.down = true;
            break;
    }
}
function canvasKeyUpHandler(ev,spArray){
    let sp = spArray[1];
    switch (ev.code) {
        case "ArrowLeft":
            sp.left = false;
            break;
        case "ArrowRight":
            sp.right = false;
            break;
        case "ArrowUp":
            sp.up = false;
            break;
        case "ArrowDown":
            sp.down = false;
            break;
    }
}
