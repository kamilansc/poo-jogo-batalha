"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonagemNaoEncontradoError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "PersonagemNaoEncontradoError";
    }
}
exports.default = PersonagemNaoEncontradoError;
