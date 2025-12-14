import Acao from "../batalha/Acao";
import Personagem from "./Personagem";

export default class Arqueiro extends Personagem {
    private _ataqueMultiplo: number;

    constructor(id: number, nome: string, vida: number, ataque: number, ataqueMultiplo: number) {
        super(id, nome, vida, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    atacar(alvo: Personagem): Acao {
        let dano = this.ataque;
        if (Math.random() > 0.5) {
            dano = this.ataque * this._ataqueMultiplo;
        }
        
        alvo.receberDano(dano)

        return new Acao(1,this,alvo,"Ataque do Arqueiro", dano)
    }
}
