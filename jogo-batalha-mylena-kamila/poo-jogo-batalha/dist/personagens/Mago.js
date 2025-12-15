"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Personagem_1 = __importDefault(require("./Personagem"));
class Mago extends Personagem_1.default {
    constructor(nome, vida, ataque) {
        super(nome, vida, ataque);
    }
    calcularDano() {
        this.vida -= 10;
        return this.ataque;
    }
}
exports.default = Mago;
