class Personagem{
    constructor(nome,lado) {
        this.nome=nome;
        this.lado=lado;
        this.sprites=this.getRightSprites(nome);
    }
    getRightSprites(nome){
        var facArray=[];
        var folder ="../../assets/sprites" + nome + "/";
        facArray.push(folder+"andar1"+".png");
        facArray.push(folder+"andar2"+".png");
        facArray.push(folder+"ataqueEspecial"+".png");
        facArray.push(folder+"defesa"+".png");

        for(let i=1;i<=3;i++){
            facArray.push(folder +"murro" +i.toString() +".png")
        }

        facArray.push(folder +"normal"+".png");

        for(let i=1;i<=5;i++){
            facArray.push(folder+"pontape"+i.toString() +".png")
        }
        return facArray;
    }
}