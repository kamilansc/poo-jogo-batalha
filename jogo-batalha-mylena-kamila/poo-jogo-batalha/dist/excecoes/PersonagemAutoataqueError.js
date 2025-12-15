"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonagemAutoataqueError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "PersonagemAutoataqueError";
    }
}
exports.default = PersonagemAutoataqueError;
