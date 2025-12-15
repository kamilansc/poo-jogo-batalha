"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdJaExisteError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "IdJaExiste";
    }
}
exports.default = IdJaExisteError;
