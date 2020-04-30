"use strict";

(function()
{
    window.addEventListener("load", main);
}());
function main(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  //get content
    var numCharacters=4;
    var characterArray = getFileNames(numCharacters);
    var personagem= new Personagem("direito","right",characterArray);
    canvas.addEventListener("initend", initEndHandler);

    init(ctx,personagem.sprites);  //carregar todos os componentes


    function initEndHandler(ev)
    {
        //instalar listeners das teclas
        window.addEventListener('keyup',kuh);
        window.addEventListener('keydown',kdh);
        var neutralSprite = ev.neutral;
        startAnim()
    }
    var kuh=function(ev){
        canvasKeyUpHandler(ev,characterArray);
    }
    var kdh=function(ev){
        canvasKeyDownHandler(ev,characterArray);
    }

function getFileNames(numCharacters) {
    let names = [];
    for (let i = 0; i < numCharacters ; i++) {
        names.push(i.toString()+"NeutralStand" + ".png");
        names.push(i.toString()+"PunchPrep" + ".png");
        names.push(i.toString()+"StandingPunch" + ".png");
    }
    return names;
}
function draw(ctx, charArray)
{
        charArray[0].draw(ctx);
}
function startAnim(ctx, neutralSprite)
    {
        draw(ctx,neutralSprite);
        //animLoop(ctx, spArray , som,0,0);
    }
function init(ctx,chArray)
{
    var neutral;
    var pos1=new Image();
    //var pos2=new Image();
    //var pos3=new Image();

    pos1.addEventListener("load", imgLoadedHandler);
    pos1.id="neutral";
    pos1.src = chArray[0];  //dá ordem de carregamento da imagem


    //var som to add later


    function imgLoadedHandler(ev)
    {
        var img = ev.target;
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        neutral = new SpriteImage(0, 0, nw/4, nh/4, 1,img);
        ctx.canvas.dispatchEvent(ev);
        }

}
function render(ctx, charArray, reqID)
{
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;
    var sp = // neutral sprite

    //apagar canvas
    ctx.clearRect(0, 0, cw, ch);

    if(sp.left && sp.x > 0){
        sp.x -= sp.speed;
        // alterna imagens de andar
    }
    else if(sp.right && sp.x < cw){
        sp.x += sp.speed;
        // alterna imagens de andar
    }
    else if(sp.up && sp.y > 0){
        sp.y -= sp.speed;
        // salto
    }
    else if(sp.down && sp.y < ch){
        sp.y += sp.speed;
        //baixa
    }
    draw(ctx,); //animaçao que secalhar deve ficar dentro dos ifs
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