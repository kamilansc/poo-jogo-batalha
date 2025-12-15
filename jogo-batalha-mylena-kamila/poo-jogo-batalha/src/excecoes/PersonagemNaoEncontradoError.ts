export default class PersonagemNaoEncontradoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "PersonagemNaoEncontradoError";
    }
} 