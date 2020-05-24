"use strict";

class SpriteImage {
    constructor(x, y, w, h, speed,img) {
        //posição e movimento
        this.xIni = x;
        this.yIni = y;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speedI = speed;
        this.speed = speed;
        this.descend = false;
        this.bulletTime = 0;
        this.bullet = false;

        //imagem
        this.img = img;
        this.imageData = this.getImageData(img);

        //teclado
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.punch = false;
        this.kick = false;
        this.special = false;

    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    clear(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }


    reset(ev, ctx) {
        this.clear(ctx);
        this.x = this.xIni;
        this.y = this.yIni;
        //console.log("seped inicila", this.speedI);
        this.speed = this.speedI;
    }

    getImageData(img) {
        //cnavas com altura e largura do carro
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);
        return ctx.getImageData(0, 0, this.width, this.height);
    }
    intersecao(s2) {

        if (this.x >= s2.x && this.x <= s2.x + s2.width && this.y >= s2.y && this.y <= s2.y + s2.height){
            return false;
        }

        var xmin = Math.max(this.x, s2.x);
        var xMax = Math.min(this.x + this.width, s2.x + s2.width);
        var ymin = Math.max(this.y, s2.y);
        var yMax = Math.min(this.y + this.height, s2.y + s2.height);


        for (let y = ymin; y <= yMax; y++) {
            for (let x = xmin; x <= xMax; x++) {
                var yLocal = Math.round(x - this.x);
                var xLocal = Math.round(y - this.y);
                var pixelNum = xLocal + yLocal * this.width;
                var pixelPosArraythis = pixelNum * 4 + 3;

                var yLocalS2 = Math.round(x - s2.x);
                var xLocalS2 = Math.round(y - s2.y);
                var pixelNumS2 = xLocalS2 + yLocalS2 * s2.width;
                var pixelPosArrayS2 = pixelNumS2 * 4 + 3;

                if (this.imageData.data[pixelPosArraythis] !== 0 && s2.imageData.data[pixelPosArrayS2] !== 0)
                    return true;
            }
        }
        return false;
    }
}
    
