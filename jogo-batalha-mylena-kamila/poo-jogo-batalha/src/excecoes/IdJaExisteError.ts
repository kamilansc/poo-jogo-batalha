export default class IdJaExisteError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "IdJaExiste";
    }
}