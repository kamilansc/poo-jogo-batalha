"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Personagem_1 = __importDefault(require("./Personagem"));
const Mago_1 = __importDefault(require("./Mago"));
const Letalis_1 = __importDefault(require("./Letalis"));
class Guerreiro extends Personagem_1.default {
    _defesa;
    constructor(defesa, nome, vida, ataque) {
        super(nome, vida, ataque);
        this._defesa = defesa;
    }
    get defesa() {
        return this._defesa;
    }
    receberDano(dano, atacante) {
        if (atacante instanceof Mago_1.default) {
            this.vida -= dano;
            return;
        }
        if (atacante instanceof Letalis_1.default) {
            const danoTotal = this.vida;
            super.receberDano(danoTotal, atacante);
            return;
        }
        if (dano < this.ataque)
            return;
        this._defesa -= dano;
        if (this._defesa < 0) {
            const resto = Math.abs(this._defesa);
            this._defesa = 0;
            this.vida -= resto;
        }
    }
    calcularDano() {
        if (this.vida <= 100 * 0.3) {
            return this.ataque * 1.30;
        }
        return this.ataque;
    }
    /* ======== MÉTODO PRA ADAPTAR O OBJETO PARA JSON ======== */
    TransformarEmJson() {
        return {
            ...super.TransformarEmJson(), // ... serve para desmontar o retorno do metodo
            defesa: this._defesa
        };
    }
}
exports.default = Guerreiro;
