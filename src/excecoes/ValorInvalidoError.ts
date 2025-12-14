export default class ValorInvalidoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "ValorInvalidoError";
    }
}