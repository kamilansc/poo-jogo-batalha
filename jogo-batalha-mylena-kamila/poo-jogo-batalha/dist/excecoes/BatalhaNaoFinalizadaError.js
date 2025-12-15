"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BatalhaNaoFinalizadaError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "BatalhaNaoFinalizadaError";
    }
}
exports.default = BatalhaNaoFinalizadaError;
