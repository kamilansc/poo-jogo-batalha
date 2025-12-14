export default class BatalhaNaoFinalizadaError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "BatalhaNaoFinalizadaError";
    }
}