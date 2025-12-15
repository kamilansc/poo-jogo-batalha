"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValorInvalidoError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "ValorInvalidoError";
    }
}
exports.default = ValorInvalidoError;
