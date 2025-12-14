import PersonagemComMesmoNomeError from "../excecoes/PersonagemComMesmoNomeError";
import PersonagemNaoEncontradoError from "../excecoes/PersonagemNaoEncontradoError";
import Personagem from "../personagens/Personagem";
import Acao from "./Acao";

export default class Batalha {
    private _personagens: Personagem[];
    private _acoes: Acao[];
    private _proximoIdPersonagem: number;
    private _proximoIdAcao: number;

    constructor(personagens: Personagem[]) {
        this._personagens = personagens;
        this._acoes = [];
        this._proximoIdPersonagem = 1;
        this._proximoIdAcao = 1;
        
    }

    definirId(personagem: Personagem | Acao): void{
        personagem.id = this._proximoIdPersonagem++;
    }

    /* ========== GETS E SETS ========== */
    get personagens(): Personagem[] {
        return this._personagens;
    }

    /* ========== MÉTODOS PRIVADOS ========== */
    consultarPersonagemPorId(id: number): Personagem{
        const personagem = this._personagens.find(p => p.id === id);

        if (!personagem) {
            throw new PersonagemNaoEncontradoError(`Personagem com id ${id} não encontrado.`)
        };

        return personagem;
    }

    /* ========== MÉTODOS OBRIGATÓRIOS ========== */
    adicionarPersonagem(personagem: Personagem): void {
        const personagemExiste: boolean = this._personagens.some(
            p => p.nome === personagem.nome
        );

        if (personagemExiste) {
            throw new PersonagemComMesmoNomeError("Já existe um personagem com esse nome.");
        }

        this.definirId(personagem);
        this._personagens.push(personagem);
    }

    consultarPersonagem(nome: string): Personagem {
        const personagem: Personagem | undefined = this._personagens.find(
            p => p.nome === nome
        );

        if (!personagem) {
            throw new PersonagemNaoEncontradoError(`Personagem '${nome}' não encontrado.`)
        };

        return personagem;
    }
}