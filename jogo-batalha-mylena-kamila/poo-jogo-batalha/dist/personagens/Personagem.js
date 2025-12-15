"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Acao_1 = __importDefault(require("../batalha/Acao"));
const IdJaExisteError_1 = __importDefault(require("../excecoes/IdJaExisteError"));
const PersonagemAutoataqueError_1 = __importDefault(require("../excecoes/PersonagemAutoataqueError"));
const PersonagemMortoError_1 = __importDefault(require("../excecoes/PersonagemMortoError"));
const ValorInvalidoError_1 = __importDefault(require("../excecoes/ValorInvalidoError"));
class Personagem {
    _id = null;
    _nome;
    _vida;
    _ataque;
    _historico;
    constructor(nome, vida, ataque) {
        if (typeof vida !== "number" || isNaN(vida)) {
            throw new ValorInvalidoError_1.default("Valor inválido! O campo vida deve receber um número.");
        }
        if (vida <= 0 || vida > 100) {
            throw new ValorInvalidoError_1.default("Valor inválido! Vida fora do intervalo permitido (1 até 100).");
        }
        if (typeof ataque !== "number" || isNaN(ataque)) {
            throw new ValorInvalidoError_1.default("Valor inválido! O campo ataque deve receber um número.");
        }
        if (ataque <= 0) {
            throw new ValorInvalidoError_1.default("Valor inválido! Ataque fora do intervalo permitido.");
        }
        this._nome = nome;
        this._vida = vida;
        this._ataque = ataque;
        this._historico = [];
    }
    /* ======== GETs e SETs ======== */
    get historico() {
        return this._historico;
    }
    get ataque() {
        return this._ataque;
    }
    get vida() {
        return this._vida;
    }
    set vida(vida) {
        this._vida = vida;
    }
    get nome() {
        return this._nome;
    }
    set id(id) {
        if (this._id !== null) {
            throw new IdJaExisteError_1.default("ID já definido.");
        }
        this._id = id;
    }
    get id() {
        if (this._id === null) {
            throw new Error("ID ainda não definido");
        }
        return this._id;
    }
    /* ======== FUNCIONALIDADES ======== */
    calcularDano() {
        return this._ataque;
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new PersonagemMortoError_1.default(`O personagem ${this._nome} está morto e não pode atacar.`);
        }
        if (!alvo.estaVivo()) {
            throw new PersonagemMortoError_1.default(`O personagem ${alvo._nome} já está morto e não pode ser atacado.`);
        }
        if (this === alvo) {
            throw new PersonagemAutoataqueError_1.default(`Personagem ${this._nome} não pode atacar a si mesmo.`);
        }
        const dano = this.calcularDano();
        alvo.receberDano(dano, this);
        const acao = new Acao_1.default(this, alvo, "ATAQUE", this._ataque);
        this.registrarAcao(acao);
        return acao;
    }
    receberDano(dano, atacante) {
        if (this._vida >= dano) {
            this._vida -= dano;
            return;
        }
        this._vida = 0;
    }
    estaVivo() {
        return this._vida > 0;
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
    exibirHistorico() {
        for (const acao of this._historico) {
            console.log(acao);
        }
    }
    /* ======== MÉTODO PRA ADAPTAR O OBJETO PARA JSON ======== */
    TransformarEmJson() {
        return {
            id: this._id,
            nome: this._nome,
            vida: this._vida,
            ataque: this._ataque,
            tipo: this.constructor.name
        };
    }
}
exports.default = Personagem;
