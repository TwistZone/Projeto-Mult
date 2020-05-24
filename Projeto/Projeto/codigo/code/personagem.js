class Personagem{
    constructor(nome,lado) {
        this.nome=nome;
        this.lado=lado;
        this.images=this.getRightSprites(nome);
        this.sprites = null;
        this.spriteCurr = null;
        this.starthp = 5;
        this.hp = 5;
    }
    getRightSprites(nome){
        var facArray=[];
        var folder ="../../assets/sprites" + nome + "/";
        facArray.push(folder+"andar1"+ this.lado + ".png"); //0
        facArray.push(folder+"andar2"+ this.lado +".png"); //1
        facArray.push(folder+"ataqueEspecial"+ this.lado +".png"); //2
        facArray.push(folder+"defesa"+ this.lado + ".png"); //3

        for(let i=1;i<=3;i++){
            facArray.push(folder +"murro" +i.toString() + this.lado +".png") // 4 5 6
        }

        facArray.push(folder +"normal"+ this.lado+".png"); // 7

        for(let i=1;i<=5;i++){
            facArray.push(folder+"pontape"+i.toString()+ this.lado +".png") // 8 9 10 11 12
        }
        facArray.push(folder +"salto"+ this.lado+".png"); // 13
        facArray.push(folder + "special"+ this.lado + ".png"); //14
        return facArray;
    }
    punch(){
        const x = this.spriteCurr.x;
        if(this.spriteCurr === this.sprites[7] || this.spriteCurr === this.sprites[0] || this.spriteCurr === this.sprites[1]){
            this.spriteCurr = this.sprites[4];
            this.spriteCurr.x = x;
            this.spriteCurr.punch = true;
        }
        else if(this.spriteCurr === this.sprites[4]){
            this.spriteCurr = this.sprites[5];
            this.spriteCurr.x = x;
            this.spriteCurr.punch = true;
        }
        else if(this.spriteCurr === this.sprites[5]){
            this.spriteCurr = this.sprites[6];
            this.spriteCurr.x = x;
            this.spriteCurr.punch = true;
        }
        else if(this.spriteCurr === this.sprites[6]){
            this.spriteCurr.x = x;
            this.spriteCurr.punch = false;
        }
    }
    kick(){
        const x = this.spriteCurr.x;
        if(this.spriteCurr === this.sprites[7] || this.spriteCurr === this.sprites[0] || this.spriteCurr === this.sprites[1]){
            this.spriteCurr = this.sprites[8];
            this.spriteCurr.x = x;
            this.spriteCurr.kick = true;
        }
        else if(this.spriteCurr === this.sprites[8]){
            this.spriteCurr = this.sprites[9];
            this.spriteCurr.x = x;
            this.spriteCurr.kick = true;
        }
        else if(this.spriteCurr === this.sprites[9]){
            this.spriteCurr = this.sprites[10];
            this.spriteCurr.x = x;
            this.spriteCurr.kick = true;
        }
        else if(this.spriteCurr === this.sprites[10]){
            this.spriteCurr = this.sprites[11];
            this.spriteCurr.x = x;
            this.spriteCurr.kick = true;
        }
        else if(this.spriteCurr === this.sprites[11]){
            this.spriteCurr = this.sprites[12];
            this.spriteCurr.x = x;
            this.spriteCurr.kick = true;
        }
        else if(this.spriteCurr === this.sprites[12]){
            this.spriteCurr.x = x;
            this.spriteCurr.kick = false;
        }
    }
    defend() {
        const x = this.spriteCurr.x;
        if (this.spriteCurr === this.sprites[7] || this.spriteCurr === this.sprites[0] || this.spriteCurr === this.sprites[1]){
            this.spriteCurr = this.sprites[3];
            this.spriteCurr.x = x;
            this.spriteCurr.down = true;
        }
        else if(this.spriteCurr === this.sprites[3]) {
            this.spriteCurr.x = x;
            this.spriteCurr.down = false;
        }
    }
    walk(){
        this.falsify();
        const x = this.spriteCurr.x;
        if(this.spriteCurr === this.sprites[7]) {
            this.spriteCurr = this.sprites[0];
            this.spriteCurr.x = x;
        }
        else if(this.spriteCurr === this.sprites[0]){
            this.spriteCurr = this.sprites[1];
            this.spriteCurr.x = x;
        }
        else if(this.spriteCurr === this.sprites[1]){
            this.spriteCurr = this.sprites[0];
            this.spriteCurr.x = x;
        }
    }
    jump() {
        const x = this.spriteCurr.x;
        const y = this.spriteCurr.y;
        if (this.spriteCurr === this.sprites[7]){
            this.spriteCurr = this.sprites[13];
            this.spriteCurr.up = true;
            this.spriteCurr.x = x;
            this.spriteCurr.y = y;
        }
        else if(this.spriteCurr.y >= this.spriteCurr.yIni){
            this.spriteCurr.up = false;
            this.spriteCurr.descend = false;
            this.spriteCurr.x = x;
            this.spriteCurr.y = this.spriteCurr.yIni;
        }

    }
    throw(){
        const x = this.spriteCurr.x;
        if(this.spriteCurr === this.sprites[7]) {
            this.spriteCurr = this.sprites[2];
            this.spriteCurr.special = true;
            this.spriteCurr.x = x;
        }
        else if(this.spriteCurr === this.sprites[2]) {
            this.spriteCurr.special = false;
        }
    }
    standard() {
        const x = this.spriteCurr.x;
        this.spriteCurr = this.sprites[7];
        this.spriteCurr.x = x;
        this.spriteCurr.y = this.spriteCurr.yIni;
        this.spriteCurr.left = false;
        this.spriteCurr.right = false;
        this.falsify();
    }
    falsify() {
        this.spriteCurr.kick=false;
        this.spriteCurr.punch=false;
        this.spriteCurr.down=false;
        this.spriteCurr.special=false;
        this.spriteCurr.up = false;
    }
}