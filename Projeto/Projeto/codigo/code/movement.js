"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  //get content
    var jogador = new Personagem("Psicologia", "R");
    var oponente = new Personagem("Psicologia","L");
    var imgArray = jogador.images;
    var opArray = oponente.images;
    var finoArray;
    timer();

    canvas.addEventListener("initend", initEndHandler);
    init(ctx, imgArray,opArray);  //carregar todos os componentes

    function initEndHandler(ev)
    {
        window.addEventListener('keyup', kuh);
        window.addEventListener('keydown', kdh);
        jogador.sprites = ev.spArray;
        jogador.spriteCurr = jogador.sprites[7];
        oponente.sprites = ev.opArray;
        oponente.spriteCurr = oponente.sprites[7];
        finoArray = ev.finoArray;
        console.log(oponente.spriteCurr);
        console.log(jogador.spriteCurr);
        startAnim(ctx,jogador,oponente,finoArray);
    }

    var kuh = function (ev) {
        canvasKeyUpHandler(ev,jogador);
    };
    var kdh=function(ev){
        canvasKeyDownHandler(ev,jogador);
    }


}

function init(ctx,chArray,opArray) {
    //carrega todas as sprites da personagem escolhida anteriormente
    var nLoad = 0;
    var totLoad = chArray.length;
    var meio = totLoad - 1;
    var final = totLoad*2 - 1;
    var imgArray = new Array(totLoad);
    var imgArray2 = new Array(totLoad);
    var n = 0;
    var k = totLoad;
    for (let i = 0; i < totLoad; i++) {
        imgArray[i] = new Image();
        imgArray[i].addEventListener("load", imgLoadedHandler);
        imgArray[i].id = n++;
        imgArray[i].src = opArray[i];
        imgArray2[i] = new Image();
        imgArray2[i].addEventListener("load", imgLoadedHandler);
        imgArray2[i].id = k++;
        imgArray2[i].src = chArray[i];
    }


    var finoArray = new Array(2);


    var finoCheio = new Image();
    finoCheio.addEventListener("load" , imgLoadedHandler);
    finoCheio.id= "finoCheio";
    finoCheio.src = "../../assets/random/botoes/canecacheia.png";


    var finoMeio = new Image();
    finoMeio.addEventListener("load" , imgLoadedHandler);
    finoMeio.id = "finoMeio";
    finoMeio.src = "../../assets/random/botoes/canecaMeia.png";

    function imgLoadedHandler(ev) {
        var img = ev.target;
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        if(img.id < totLoad -1)
            imgArray[img.id] = new SpriteImage(Math.round(ctx.canvas.width/8), Math.round(ctx.canvas.height - ctx.canvas.height/3), nw /3, nh /3, 10, img);
        else if(img.id === meio.toString() )
            imgArray[img.id] = new SpriteImage(0, Math.round(ctx.canvas.height - ctx.canvas.height/3) + 25, nw /3, nh /3, 20, img);
        else if(img.id === final.toString() )
            opArray[img.id - totLoad] = new SpriteImage(0, Math.round(ctx.canvas.height - ctx.canvas.height/3) + 25, nw /3, nh /3, 20, img);
        else if(img.id > meio)
            opArray[img.id - totLoad] = new SpriteImage(Math.round(ctx.canvas.width - ctx.canvas.width/8), Math.round(ctx.canvas.height - ctx.canvas.height/3), nw /3, nh /3, 10, img);
        if(img.id === "finoCheio"){
            finoArray[0]= new FinoImage(Math.round(nw/2), Math.round(nh/2) , img);
        }else
            finoArray[1]= new FinoImage(nw/2, nh/2,img);
        nLoad++;
        if (nLoad == totLoad * 2 + 2) {
            var ev2 = new Event("initend");
            ev2.spArray = imgArray;
            ev2.opArray = opArray;
            ev2.finoArray = finoArray;
            ctx.canvas.dispatchEvent(ev2);
        }
    }
}


function draw(ctx, spArray) {
    const dim = spArray.length;
    for (let i = 0; i < dim; i++)
        spArray[i].draw(ctx);
}
function startAnim(ctx, jogador,oponente,finoArray) {
    draw(ctx,jogador.spriteCurr);
    draw(ctx,oponente.spriteCurr);
    //finoArray[0].draw(ctx,10);
    animLoop(ctx, jogador,oponente,finoArray);
}


function animLoop(ctx,jogador,oponente,finoArray)
{
    var fps; // requestAnimationFrame default = 60
    if (jogador.spriteCurr.punch )
        fps = 10;
    else if(jogador.spriteCurr.special)
        fps = 5;
    else fps = 45;
    var al = function(time)
    {
        animLoop(ctx, jogador,oponente,finoArray);
    };
    var reqID = setTimeout(function(){window.requestAnimationFrame(al)},1000/fps);

    render(ctx, jogador,oponente,finoArray,reqID);
}

function render(ctx, jogador,oponente,finoArray,reqID)
{
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    var finoCheio = finoArray[0];
    var finoMeio = finoArray[1];
    const sp = jogador.spriteCurr;
    const op = oponente.spriteCurr;
    var bullet = jogador.sprites[14];
    var opbullet = oponente.sprites[14];
    var spArray = [sp,op];
    var r;

    //apagar canvas
    ctx.clearRect(0, 0, cw, ch);
    if(!bullet.bullet)
        bullet.x = sp.x - 5;
    if(!opbullet.bullet)
        opbullet.x = op.x + 5;
    ctx.clearRect(0, 0, cw, ch);
    if(sp.left && sp.x >0){
        sp.x -= sp.speed;
        jogador.walk();
    }
    if (sp.right && !sp.intersecao(op)) {
        sp.x += sp.speed;
        jogador.walk();
    }
    if (sp.up) {
        const yMax = 250;
        if(sp.y > yMax && !sp.descend)
            sp.y -= sp.speed;
        else if(sp.y === yMax)
            sp.descend = true;
        else if(sp.y < sp.yIni) {
            sp.descend = true;
            sp.y += sp.speed * 2;
        }
        jogador.jump();
    }
    if (sp.down) {
        jogador.defend();
    }
    if (sp.kick){
        jogador.kick();
        if(sp.intersecao(oponente) && !oponente.down )
            oponente.hp -= 0.5;
    }
    if (sp.punch) {
        jogador.punch();
        if(sp.intersecao(oponente) && !oponente.down )
            oponente.hp -= 0.5;
    }
    if(sp.special){
        jogador.throw();
        bullet.bullet = true;
    }
    if(bullet.bullet) {
        const range = 20;
        spArray.push(bullet);
        if (bullet.bulletTime < range)
            bullet.x += bullet.speed;
        else if(bullet.bulletTime >= range) {
            bullet.bullet = false;
            spArray.pop();
            bullet.x = sp.x;
            bullet.bulletTime = 0;
        }
        bullet.bulletTime++;
    }
    if(opbullet.bullet) {
        const range = 20;
        spArray.push(opbullet);
        if (opbullet.bulletTime < range)
            opbullet.x -= opbullet.speed;
        else if(opbullet.bulletTime >= range) {
            opbullet.bullet = false;
            spArray.pop();
            opbullet.x = op.x;
            opbullet.bulletTime = 0;
        }
        opbullet.bulletTime++;
    }
    if(!sp.left && !sp.right && !sp.up && !sp.down && !sp.kick && !sp.punch && !sp.special)
        jogador.standard();
    if(!op.intersecao(sp)){
        r = Math.floor(Math.random()* 10);
        if(r < 6) {
            op.x -= op.speed;
            oponente.walk();
        }
        else if( r > 6 && r <= 8)
            oponente.throw();
        else oponente.defend();
    }
    else{
        r = Math.floor(Math.random()*3);
        if(r == 0)
            oponente.kick();
        if(op.intersecao(jogador) && !jogador.down)
            jogador.hp -= 0.5;
        else if (r == 1)
            oponente.punch();
        if(op.intersecao(jogador) && !jogador.down)
            jogador.hp -= 0.5;
        else if(op.x < cw - 5) {
            op.x += op.speed;
            oponente.walk();
        }
    }
    if(opbullet.intersecao(sp) && !jogador.down  && opbullet.bullet)
        jogador.hp -= 1;
    if(bullet.intersecao(op) && !oponente.down && bullet.bullet)
        oponente.hp -= 1;
    console.log(jogador.hp);
    console.log(oponente.hp);
    if(jogador.hp <= 0 || oponente.hp <= 0)
        window.cancelAnimationFrame(reqID);
    draw(ctx,spArray);
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

function canvasKeyDownHandler(ev,jogador) {
    let sp = jogador.spriteCurr;
    switch (ev.code) {
        case "ArrowLeft":
            sp.left = true;
            sp.right = false;
            jogador.falsify();
            break;
        case "KeyA":
            sp.left = true;
            sp.right = false;
            jogador.falsify();
            break;
        case "ArrowRight":
            sp.right = true;
            sp.left = false;
            jogador.falsify();
            break;
        case "KeyD":
            sp.right = true;
            sp.left = false;
            jogador.falsify();
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
        case "KeyK":
            sp.kick = true;
            break;
        case "KeyL":
            sp.special = true;
            break;
        case("Escape"):
            console.log("escape");
            parent.window.postMessage("menuJogo", "*");
            break;
        default:
            console.log(ev.code);
    }
}
function canvasKeyUpHandler(ev,jogador){
    let sp = jogador.spriteCurr;
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
        default:
            console.log(ev.code);
    }
}
