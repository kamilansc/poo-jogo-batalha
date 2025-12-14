import Acao from "../batalha/Acao";
import PersonagemAutoataqueError from "../excecoes/PersonagemAutoataqueError";
import PersonagemMortoError from "../excecoes/PersonagemMortoError";
import ValorInvalidoError from "../excecoes/ValorInvalidoError";

export default class Personagem {
    private _id: number;
    private _nome: string;
    private _vida: number;
    private _ataque: number;
    private _historico: Acao[];

    constructor(id: number, nome: string, vida: number, ataque: number) {
        if (typeof vida !== "number" || isNaN(vida)) {
            throw new ValorInvalidoError("Valor inválido! O campo vida deve receber um número.");
        }
        if (vida <= 0 || vida > 100) {
            throw new ValorInvalidoError("Valor inválido! Vida fora do intervalo permitido (1 até 100).");
        }
        
        if (typeof ataque !== "number" || isNaN(ataque)) {
            throw new ValorInvalidoError("Valor inválido! O campo ataque deve receber um número.");
        }

        this._id = id;
        this._nome = nome;
        this._vida = vida;
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

    get nome(): string {
        return this._nome;
    }

    
    /* ======== FUNCIONALIDADES ======== */ 
    calcularDano(): number {
        return this._ataque;
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            this.registrarAcao(new Acao(7, this, alvo, "ATAQUE_MORTO_ERRO", this._ataque));
            throw new PersonagemMortoError(`O personagem ${this._nome} está morto e não pode atacar.`)
        }

        if(!alvo.estaVivo()) {
            this.registrarAcao(new Acao(8, this, alvo, "RECEBER_DANO_MORTO_ERRO", this._ataque));
            throw new PersonagemMortoError(`O personagem ${alvo._nome} já está morto e não pode ser atacado.`)
        }

        if (this === alvo) {
            this.registrarAcao(new Acao(9, this, alvo, "AUTOATAQUE_ERRO", this._ataque));
            throw new PersonagemAutoataqueError(`Personagem ${this._nome} não pode atacar a si mesmo.`);
        }

        const dano: number = this.calcularDano();
        alvo.receberDano(this._ataque);

        const acao: Acao = new Acao(1, this, alvo, "ATAQUE", this._ataque);
        this.registrarAcao(acao);

        return acao;
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

    exibirHistorico(): void {
        for (const acao of this._historico) {
            console.log(acao);
        }
    }
}