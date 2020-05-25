"use strict";

class FinoImage
{
    constructor(w, h, x,y ,fino)
    {
        //posição e movimento
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;

        //imagem
        this.fino = fino;
    }

    draw(ctx, nf)
    {
        for (let i = 0; i < nf; i++)
        {
            ctx.drawImage(this.fino,this.x,this.y, this.width, this.height);
            if(i  === 4)
                this.x += 200;
            else
                this.x  +=40;
        }

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