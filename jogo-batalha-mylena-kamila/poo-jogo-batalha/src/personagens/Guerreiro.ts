import Personagem from "./Personagem";
import Acao from "../batalha/Acao";
import Mago from "./Mago";
import Letalis from "./Letalis";


export default class Guerreiro extends Personagem {
    private _defesa: number;


    constructor(defesa: number, nome: string, vida: number, ataque: number ) {
        super(nome, vida, ataque);
        this._defesa = defesa;
    }

    get defesa(): number {
        return this._defesa;
    }

    receberDano(dano: number, atacante: Personagem): void {
        if (atacante instanceof Mago) {
            this.vida -= dano;
            return;
        }

        if (atacante instanceof Letalis) {
            const danoTotal = this.vida;
            super.receberDano(danoTotal, atacante);
            return;
        }

        if (dano < this.ataque) return;

        this._defesa -= dano;

        if (this._defesa < 0) {
            const resto = Math.abs(this._defesa);
            this._defesa = 0;
            this.vida -= resto;
        }


    }


    calcularDano(): number {
        if (this.vida <= 100 * 0.3 ) {
            return this.ataque * 1.30;

        }
        return this.ataque;

    }

    /* ======== MÉTODO PRA ADAPTAR O OBJETO PARA JSON ======== */ 
    TransformarEmJson(): any{
        return {
            ...super.TransformarEmJson(), // ... serve para desmontar o retorno do metodo
            defesa: this._defesa
        };
    }
} 