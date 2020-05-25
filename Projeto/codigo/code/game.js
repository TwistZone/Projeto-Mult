"use strict";

(function()
{
    window.addEventListener("load", main);
}());

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  //get content
    var finoArray;
    var imgArray = [];
    var opArray = [];

    /* ------------------ NIVEIS ---------------------*/

    var arrPersonagens= ["Fctuc", "Psicologia", "Direito", "Economia", "Medicina", "Farmacia", "Desporto", "Letras"];


    var nivel = sessionStorage.getItem("nivel");
    if(nivel <= 7){
        /*-------------------- RESET -----------------------*/
        var oponente = new Personagem(arrPersonagens[nivel] , "R" , 5);

    }

    /*----------------- PERSONAGEM ESCOLHIDA  --------------------*/
    var Escolhida = sessionStorage.getItem("Escolhida");
    var jogador = new Personagem(Escolhida,"L", 5);


    imgArray = jogador.images;
    opArray = oponente.images;

    /* -------------- SOM -------------*/

    var isPlaying = sessionStorage.getItem("musica");
    var musica = document.getElementById("musica");
    if(isPlaying === 1){
        musica.mute = false;
    }else if(isPlaying === 0){
        musica.mute = true;
    }



    /*--------------- CONOMETRO ------------------*/
    timer(jogador , oponente);

    canvas.addEventListener("initend", initEndHandler);
    init(ctx,opArray,imgArray);//carregar todos os componentes


    function initEndHandler(ev)
    {
        window.addEventListener('keyup', kuh);
        window.addEventListener('keydown', kdh);
        jogador.sprites = ev.spArray;
        jogador.spriteCurr = jogador.sprites[7];
        console.log(jogador.sprites[7].img);
        oponente.sprites = ev.opArray;
        oponente.spriteCurr = oponente.sprites[7];
        finoArray = ev.finoArray;
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
            finoArray[0]= new FinoImage(Math.round(nw/2), Math.round(nh/2),25,50 , img);
        }else if(img.id === "finoMeio")
            finoArray[1]= new FinoImage(nw/2, nh/2,0,50,img);
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

function drawFino(ctx , fino ,nf)
{
    fino.draw(ctx, nf)
}


function draw(ctx, spArray) {
    const dim = spArray.length;
    for (let i = 0; i < dim; i++)
        spArray[i].draw(ctx);
}
function startAnim(ctx, jogador,oponente,finoArray) {
    draw(ctx,jogador.spriteCurr);
    draw(ctx,oponente.spriteCurr);
    drawFino(ctx,finoArray[0] ,0, 10);
    animLoop(ctx, jogador,oponente,finoArray);
}


function animLoop(ctx,jogador,oponente,finoArray)
{
    var fps; // requestAnimationFrame default = 60
    if (jogador.spriteCurr.punch )
        fps = 10;
    else if(jogador.spriteCurr.special)
        fps = 5;
    else if (jogador.spriteCurr.kick)
        fps = 25;
    else fps = 40;
    var al = function(time)
    {
        animLoop(ctx, jogador,oponente,finoArray);
    };
    var reqID = setTimeout(function(){window.requestAnimationFrame(al)},1000/fps);

    render(ctx, jogador,oponente,finoArray,reqID);
}

function render(ctx, jogador,oponente,finoArray,reqID)
{    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const sp = jogador.spriteCurr;
    const op = oponente.spriteCurr;
    var bullet = jogador.sprites[14];
    var opbullet = oponente.sprites[14];
    var spArray = [sp,op];
    var r;

    //apagar canvas
    ctx.clearRect(0, 0, cw, ch);
    //if( op.x >= cw)
        //op.x -= op.speed;

    if(!bullet.bullet)
        bullet.x = sp.x - 5;
    if(!opbullet.bullet)
        opbullet.x = op.x + 5;
    if(sp.left && sp.x >0){
        sp.x -= sp.speed;
        jogador.walk();
    }
    if (sp.right ) {
        if(!sp.intersecao(op)) {
            sp.x += sp.speed;
            jogador.walk();
        }
        if(op.x + op.width < cw) {
            op.x += op.speed;
            oponente.walk();
        }
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
        r = Math.floor(Math.random()* 20);
        jogador.kick();
        if (r < 5)
            oponente.defend();
        if(sp.intersecao(op) && !op.down && sp === jogador.sprites[11] )
            oponente.hp -= 0.5;
    }
    if (sp.punch) {
        r = Math.floor(Math.random()* 20);
        jogador.punch();
        if (r < 5)
            oponente.defend();
        if(sp.intersecao(op) && !op.down && sp === jogador.sprites[6] )
            oponente.hp -= 0.5;
    }
    if(sp.special){
        r = Math.floor(Math.random()* 10);
        jogador.throw();
        bullet.bullet = true;
        if (r < 3)
            oponente.defend();
    }

    if(!sp.left && !sp.right && !sp.up && !sp.down && !sp.kick && !sp.punch && !sp.special)
        jogador.standard();
    if(!op.intersecao(sp)){
        r = Math.floor(Math.random()* 1000);
        if(r < 500) {
            if (op.x > sp.x + 35){
                op.x -= Math.floor(op.speed / 2);
                oponente.walk();
            }
            else if(op.x < sp.x)
                op.x = sp.x + 35;
        }
        else if(r >= 500 && r < 550 ) {
            oponente.kick();
            if (op.intersecao(sp) && !sp.down)
                jogador.hp -= 0.5;
        }
        else if (r >= 550 && r < 650) {
            oponente.punch();
            if (op.intersecao(sp) && !sp.down)
                jogador.hp -= 0.5;
        }
        else if( r > 975) {
            oponente.throw();
            opbullet.bullet = true;
        }
    }
    else if(op.x < cw - 5 && !op.intersecao(jogador)) {
        op.x += op.speed;
        oponente.walk();
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
    if(opbullet.intersecao(sp) && !sp.down  && opbullet.bullet) {
        jogador.hp -= 1;
        opbullet.x = op.x;
        opbullet.bullet = false;
    }
    if(bullet.intersecao(op) && !op.down && bullet.bullet) {
        oponente.hp -= 1;
        bullet.x = sp.x;
        bullet.bullet = false;
    }
    if ((op === oponente.sprites[6] || op === oponente.sprites [11]) && op.intersecao(sp) && !sp.down)
        jogador.hp -= 0.5;
    /* -------- VER A VIDA DOS JOGADORES -----------------*/
    if(jogador.hp === 0){
        window.cancelAnimationFrame(reqID);
        parent.window.postMessage("perder", "*");
    }else if (jogador.hp === 0.5){
        finoArray[1].x = 25;
        drawFino(ctx , finoArray[1], 1);
    }else if(jogador.hp === 1){
        finoArray[0].x = 25;
        drawFino(ctx , finoArray[0] , 1);
    }else if(jogador.hp === 1.5){
        finoArray[1].x = 65;
        finoArray[0].x=25;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 1);
    }else if(jogador.hp === 2){
        finoArray[0].x = 25;
        drawFino(ctx , finoArray[0] , 2);
    }else if(jogador.hp === 2.5){
        finoArray[0].x = 25;
        finoArray[1].x = 105;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 2);
    }else if(jogador.hp === 3){
        finoArray[0].x = 25;
        drawFino(ctx , finoArray[0] , 3);
    }else if(jogador.hp === 3.5){
        finoArray[0].x = 25;
        finoArray[1].x = 145;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 3);
    }else if(jogador.hp === 4){
        finoArray[0].x = 25;
        drawFino(ctx , finoArray[0] , 4);
    }else if (jogador.hp === 4.5){
        finoArray[0].x = 25;
        finoArray[1].x = 185;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 4);
    }else if (jogador.hp === 5){
        finoArray[0].x = 25;
        drawFino(ctx , finoArray[0] , 5);
    }

    /*--------------- VIDA OPNENTES -----------------------*/
    if(oponente.hp === 0) {
        if (+sessionStorage.getItem("nivel") === 7) {
            window.cancelAnimationFrame(reqID);
            parent.window.postMessage("final", "*");
        } else {
            window.cancelAnimationFrame(reqID);
            parent.window.postMessage("ganhar", "*");
        }
    }else if (oponente.hp === 0.5){
        finoArray[1].x = 545;
        drawFino(ctx , finoArray[1] ,1);
    }else if(oponente.hp === 1){
        finoArray[0].x = 545;
        drawFino(ctx , finoArray[0] , 1);
    }else if(oponente.hp === 1.5){
        finoArray[0].x=545;
        finoArray[1].x = 505;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 1);
    }else if(oponente.hp === 2){
        finoArray[0].x = 505;
        drawFino(ctx , finoArray[0] , 2);
    }else if(oponente.hp === 2.5){
        finoArray[0].x = 505;
        finoArray[1].x = 465;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 2);
    }else if(oponente.hp === 3){
        finoArray[0].x = 465;
        drawFino(ctx , finoArray[0] , 3);
    }else if(oponente.hp === 3.5){
        finoArray[0].x = 465;
        finoArray[1].x = 425;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 3);
    }else if(oponente.hp === 4){
        finoArray[0].x = 425;
        drawFino(ctx , finoArray[0] , 4);
    }else if (oponente.hp === 4.5){
        finoArray[0].x = 425;
        finoArray[1].x = 385;
        drawFino(ctx , finoArray[1] , 1);
        drawFino(ctx , finoArray[0] , 4);
    }else if (oponente.hp === 5){
        finoArray[0].x = 385;
        drawFino(ctx , finoArray[0] , 5);
    }

    draw(ctx,spArray);

}

function timer(jogador , oponente){
    var sec = 90;
    var timer = setInterval(function(){
        document.getElementById('clock').innerHTML= sec;
        sec--;
        if (sec <= 0) {
            clearInterval(timer);
            if(jogador.hp <= oponente.hp){
                perderHandler();
            }
            else{
                ganharHandler();
            }
        }

    }, 1000);

}

function canvasKeyDownHandler(ev,jogador) {
    var array = new Array(3);
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

function perderHandler(ev) {
    parent.window.postMessage("perder", "*");
}

function ganharHandler(ev) {
    parent.window.postMessage("ganhar", "*");
}


