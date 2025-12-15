"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Personagem_1 = __importDefault(require("./Personagem"));
const Mago_1 = __importDefault(require("./Mago"));
const Letalis_1 = __importDefault(require("./Letalis"));
class Arqueiro extends Personagem_1.default {
    _ataqueMultiplo;
    constructor(nome, vida, ataque, ataqueMultiplo) {
        super(nome, vida, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }
    receberDano(dano, atacante) {
        if (atacante instanceof Mago_1.default) {
            super.receberDano(dano * 2, atacante);
            return;
        }
        if (atacante instanceof Letalis_1.default) {
            const danoTotal = this.vida;
            super.receberDano(danoTotal, atacante);
            return;
        }
        super.receberDano(dano, atacante);
    }
    calcularDano() {
        if (Math.random() > 0.5) {
            return this.ataque * this._ataqueMultiplo;
        }
        return this.ataque;
    }
    /* ======== MÉTODO PRA ADAPTAR O OBJETO PARA JSON ======== */
    TransformarEmJson() {
        return {
            ...super.TransformarEmJson(),
            ataqueMultiplo: this._ataqueMultiplo
        };
    }
}
exports.default = Arqueiro;
