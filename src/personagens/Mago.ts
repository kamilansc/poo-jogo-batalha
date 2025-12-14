import Acao from "../batalha/Acao";
import Arqueiro from "./Arqueiro";
import Guerreiro from "./Guerreiro";
import Personagem from "./Personagem";


export default class Mago extends Personagem {
    constructor(id:number, nome: string, vida: number, ataque: number){
        super(id, nome,vida,ataque);
    }

    calcularDano(alvo: Personagem): number {
        this.vida -= 10;

        let dano: number;

        if (alvo instanceof Arqueiro) {
            dano = this.ataque * 2;
        } else {
            dano = this.ataque;
        }
        alvo.receberDano(dano);

        return dano;
    }



}