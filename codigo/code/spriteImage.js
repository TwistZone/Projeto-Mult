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
    
    
            //imagem
            this.img = img;
            this.imageData = this.getImageData(img);
    
            //teclado
            this.spriteIni = null;
            this.spriteCurr = null;
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            this.punch = false;
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
    }
    
