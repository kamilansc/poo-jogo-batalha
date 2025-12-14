import Acao from "../batalha/Acao";
import Personagem from "./Personagem";
import Mago from "./Mago";

export default class Arqueiro extends Personagem {
    private _ataqueMultiplo: number;

    constructor(nome: string, vida: number, ataque: number, ataqueMultiplo: number) {
        super(nome, vida, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    receberDano(dano: number, atacante: Personagem): void {
        if (atacante instanceof Mago) {
            super.receberDano(dano * 2, atacante);
            return;
        }

        super.receberDano(dano, atacante);
        }


    calcularDano(): number {

    if (Math.random() > 0.5) {

        return this.ataque * this._ataqueMultiplo;
    }

    return this.ataque;
    }
}
