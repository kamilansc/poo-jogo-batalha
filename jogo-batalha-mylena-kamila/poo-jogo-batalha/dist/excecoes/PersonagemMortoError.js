"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonagemMortoError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "PersonagemMortoError";
    }
}
exports.default = PersonagemMortoError;
