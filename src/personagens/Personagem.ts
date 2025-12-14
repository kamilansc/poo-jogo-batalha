import Acao from "../batalha/Acao";

export default class Personagem {
    private _id: number;
    private _nome: string;
    private _vida: number;
    private _ataque: number;
    private _historico: Acao[];

    constructor(id: number, nome: string, vida: number, ataque: number) {
        this._id = id;
        this._nome = nome;
        this._vida = this.validarVida(vida);
        this._ataque = ataque;
        this._historico = [];
    }

    /* ======== GETs e SETs ======== */
    get historico(): Acao[] {
        return this._historico;
    }

    get ataque(): number {
        return this._ataque;
    }

    get vida(): number {
        return this._vida
    }

    set vida(vida: number) {
        this._vida = vida;
    }

    validarVida(vida: number) {
        if (vida >= 0 && vida <= 100) {
            return vida;
        }
        throw new Error("Vida inválida");
    }

    /* ======== FUNCIONALIDADES ======== */ 
    atacar(alvo: Personagem): Acao {
        alvo.receberDano(this._ataque);
        return new Acao(1, this, alvo, "ATAQUE", this._ataque);
    }

    receberDano(valor: number): void {
        if (this._vida >= valor) {
            this._vida -= valor;
            return;
        }
        
        this._vida = 0;
    }

    estaVivo(): boolean {
        return this._vida > 0;
    }

    registrarAcao(acao: Acao): void {
        this._historico.push(acao);
    }
}