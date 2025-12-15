import Personagem from "./Personagem";

export default class Reflexivo extends Personagem{
    constructor(nome: string, vida: number, ataque: number){
        super(nome, vida, ataque);   
    }

    receberDano(dano: number, atacante: Personagem){
        
    }
}