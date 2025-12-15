export default class PersonagemAutoataqueError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "PersonagemAutoataqueError";
    }
}