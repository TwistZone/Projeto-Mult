"use strict";

class FinoImage
{
    constructor(w, h, fino)
    {
        //posição e movimento
        this.width = w;
        this.height = h;

        //imagem
        this.fino = fino;
    }

    draw(ctx , x, y)
    {
        ctx.drawImage(this.fino,x,y, this.width, this.height);
    }


    clear(ctx)
    {
        ctx.clearRect(0,0,this.width, this.height);
    }

    reset(ev, ctx)
    {
        this.clear(ctx);
    }
}