import BatalhaNaoFinalizadaError from "../excecoes/BatalhaNaoFinalizadaError";
import NaoHaVencedorError from "../excecoes/NaoHaVencedorError";
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
    
    /* ========== GETS E SETS ========== */
    get personagens(): Personagem[] {
        return this._personagens;
    }

    get acoes(): Acao[] {
        return this._acoes;
    }
    
    /* ========== MÉTODOS PRIVADOS ========== */
    private definirId(objeto: Personagem | Acao): void{
        if (objeto instanceof Personagem) {
            objeto.id = this._proximoIdPersonagem++;
        }
        else {
            objeto.id = this._proximoIdAcao++;
        }
    }

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

    turno(atacanteId: number, alvoId: number): Acao[]{
        const atacante = this.consultarPersonagemPorId(atacanteId);
        const alvo = this.consultarPersonagemPorId(alvoId);

        const acao = atacante.atacar(alvo);
        this.definirId(acao);
        this._acoes.push(acao);

        return [acao];
    }

    listarPersonagens(): Personagem[] {
        return this._personagens;
    }

    listarAcoes(): Acao[] {
        return this._acoes;
    }

    verificarVencedor(): Personagem {
        const vivos = this._personagens.filter(personagem => personagem.estaVivo());

        if (vivos.length > 1) {
            throw new BatalhaNaoFinalizadaError(
            "A batalha ainda não terminou. Não é possível determinar o vencedor.")
        }
        if (vivos.length === 0) {
            throw new NaoHaVencedorError("Não há personagens vivos na batalha.")
        }

        return vivos[0]!;
    }
}