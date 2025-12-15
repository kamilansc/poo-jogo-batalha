export default class PersonagemMortoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "PersonagemMortoError";
    }
}