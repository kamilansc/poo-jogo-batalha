export default class PersonagemComMesmoNomeError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "PersonagemComMesmoNomeError";
    }
}