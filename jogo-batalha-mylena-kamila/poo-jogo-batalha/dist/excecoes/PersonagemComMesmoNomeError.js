"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonagemComMesmoNomeError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "PersonagemComMesmoNomeError";
    }
}
exports.default = PersonagemComMesmoNomeError;
