import Personagem from "./Personagem"

export default class Letalis extends Personagem {
    constructor (nome: string, vida: number){
        const ataqueLetalis = 100;
        super(nome, vida, ataqueLetalis);
    }
}