class Personagem{
    constructor(nome,lado,spArray) {
        this.nome=nome;
        this.lado=lado;
        this.sprites=this.getRightSprites(nome,spArray)
    }
    getRightSprites(nome,spArray){
        var facArray=[];
        switch (nome) {
            case "desporto":
                facArray=[spArray[0],spArray[1],spArray[2]];
                break;
            case "direito":
                facArray=[spArray[3],spArray[4],spArray[5]];
                break;
            case "economia":
                facArray=[spArray[6],spArray[7],spArray[8]];
                break;
            case "letras":
                facArray=[spArray[9],spArray[10],spArray[11]];
                break;
        }
        return facArray;
    }
}