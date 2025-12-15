"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NaoHaVencedorError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "NaoHaVencedorError";
    }
}
exports.default = NaoHaVencedorError;
