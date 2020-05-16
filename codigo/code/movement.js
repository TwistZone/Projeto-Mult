"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  //get content
    var personagem = new Personagem("Psicologia", "right");
    var charArray = personagem.sprites;
    for(let i=0;i<charArray.length;i++)
        console.log(charArray[i]);

    canvas.addEventListener("initend", initEndHandler);
    init(ctx, charArray);  //carregar todos os componentes


    function initEndHandler(ev) {
        //instalar listeners das teclas
        window.addEventListener('keyup', kuh);
        window.addEventListener('keydown', kdh);
        charArray = ev.spArray;
        startAnim(ctx,charArray)
    }

    var kuh = function (ev) {
        canvasKeyUpHandler(ev, charArray);
    };
    var kdh = function (ev) {
        canvasKeyDownHandler(ev, charArray);
    };
}
function draw(ctx, sprite)
{
        sprite.draw(ctx);
}
function startAnim(ctx, charArray)
    {
        draw(ctx,charArray[7]);
        animLoop(ctx, charArray);
    }
function init(ctx,chArray) {

    var nLoad = 0;
    var totLoad = chArray.length;
    var imgArray = new Array(totLoad);
    var n = 0;
    for (let i = 0; i < totLoad; i++) {
        imgArray[i] = new Image();
        imgArray[i].addEventListener("load", imgLoadedHandler);
        imgArray[i].id = n++;
        imgArray[i].src = chArray[i];
    }


    //var som to add later


    function imgLoadedHandler(ev) {
        var img = ev.target;
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        imgArray[img.id] = new SpriteImage(500, 325, nw /3, nh /3, 1, img);
        nLoad++;
        if (nLoad == totLoad) {
            var ev2 = new Event("initend");
            ev2.spArray = imgArray;
            ctx.canvas.dispatchEvent(ev2);
        }
    }
}

function animLoop(ctx, spArray)
{
    var al = function(time)
    {
        animLoop(ctx, spArray);
    }
    var reqID = window.requestAnimationFrame(al);

    render(ctx, spArray,reqID);
}

function render(ctx, charArray,reqID)
{
    var cw = ctx.canvas.width;
    var ch = ctx.canvas.height;

    var sp = charArray[7];
    var normal = charArray[7];
    var punchArray=[];
    for(let i=4;i<=6;i++)
        punchArray.push(charArray[i]);
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
    if(sp.punch){
        if(sp == normal){
            sp = punchArray[0];
            draw(ctx,sp);
        }
        if(sp == punchArray[0]){
            sp = punchArray[1];
            draw(ctx,sp);
        }
        if(sp == punchArray[1]){
            sp = punchArray[2];
            draw(ctx,sp);
        }
        if(sp == punchArray[2]){
            sp = punchArray[1];
            draw(ctx,sp);
        }
        if(sp == punchArray[1]){
            sp = punchArray[0];
        }
    }
    draw(ctx,sp);
}
function canvasKeyDownHandler(ev,spArray) {
    let sp = spArray[7];
    switch (ev.code) {
        case "ArrowLeft":
            sp.left = true;
            break;
        case "KeyA":
            sp.left = true;
            break;
        case "ArrowRight":
            sp.right = true;
            break;
        case "KeyD":
            sp.right = true;
            break;
        case "ArrowUp":
            sp.up = true;
            break;
        case "KeyW":
            sp.up = true;
            break;
        case "ArrowDown":
            sp.down = true;
            break;
        case "KeyS":
            sp.down = true;
            break;
        case "KeyJ":
            sp.punch = true;
            break;
        default:
            console.log(ev.code);
    }

}
function canvasKeyUpHandler(ev,spArray){
    let sp = spArray[7];
    switch (ev.code) {
        case "ArrowLeft":
            sp.left = false;
            break;
        case "KeyA":
            sp.left = false;
            break;
        case "ArrowRight":
            sp.right = false;
            break;
        case "KeyD":
            sp.right = false;
            break;
        case "ArrowUp":
            sp.up = false;
            break;
        case "KeyW":
            sp.up = false;
            break;
        case "ArrowDown":
            sp.down =false;
            break;
        case "KeyS":
            sp.down = false;
            break;
        case "KeyJ":
            sp.punch = false;
            break;
        default:
            console.log(ev.code);
    }
}
