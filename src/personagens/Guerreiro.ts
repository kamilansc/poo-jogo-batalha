import Personagem from "./Personagem";
import Acao from "../batalha/Acao";


export default class Guerreiro extends Personagem {
    private _defesa: number;


    constructor(defesa: number, id: number, nome: string, vida: number, ataque: number ) {
        super(id, nome, vida, ataque);
        this._defesa = defesa;
    }

    get defesa(): number {
        return this._defesa;
    }

    receberDano(valorAtaque: number): void {
        if (valorAtaque < this.ataque) {
            return;
        }

        this._defesa -= valorAtaque;

        if (this._defesa < 0) {
            let restoataque = Math.abs(this._defesa);
            this._defesa = 0;
            super.receberDano(restoataque);

        }

    }

    atacar(alvo: Personagem): Acao {
        let dano = this.ataque;
        if (this.vida <= 100 * 0.3 ) {
            dano *= 1.30;

        }
        alvo.receberDano(dano);

        return new Acao(1,this, alvo,"Ataque do Guerreiro", dano);

    }

} 


 