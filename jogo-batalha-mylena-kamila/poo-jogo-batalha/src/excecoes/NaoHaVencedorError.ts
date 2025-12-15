export default class NaoHaVencedorError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "NaoHaVencedorError";
    }
}