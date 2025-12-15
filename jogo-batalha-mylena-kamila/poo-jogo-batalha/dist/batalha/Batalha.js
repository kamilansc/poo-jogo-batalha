"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BatalhaNaoFinalizadaError_1 = __importDefault(require("../excecoes/BatalhaNaoFinalizadaError"));
const NaoHaVencedorError_1 = __importDefault(require("../excecoes/NaoHaVencedorError"));
const PersonagemComMesmoNomeError_1 = __importDefault(require("../excecoes/PersonagemComMesmoNomeError"));
const PersonagemNaoEncontradoError_1 = __importDefault(require("../excecoes/PersonagemNaoEncontradoError"));
const Personagem_1 = __importDefault(require("../personagens/Personagem"));
class Batalha {
    _personagens;
    _acoes;
    _proximoIdPersonagem;
    _proximoIdAcao;
    constructor(personagens) {
        this._personagens = personagens;
        this._acoes = [];
        // Se existirem personagens com ID, pega o maior ID + 1
        const ids = personagens
            .map(p => p["_id"])
            .filter((id) => id !== null); // remove null
        this._proximoIdPersonagem = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        this._proximoIdAcao = 1;
    }
    /* ========== GETS E SETS ========== */
    get personagens() {
        return this._personagens;
    }
    get acoes() {
        return this._acoes;
    }
    /* ========== MÉTODOS PRIVADOS ========== */
    definirId(objeto) {
        if (objeto instanceof Personagem_1.default) {
            objeto.id = this._proximoIdPersonagem++;
        }
        else {
            objeto.id = this._proximoIdAcao++;
        }
    }
    consultarPersonagemPorId(id) {
        const personagem = this._personagens.find(p => p.id === id);
        if (!personagem) {
            throw new PersonagemNaoEncontradoError_1.default(`Personagem com id ${id} não encontrado.`);
        }
        ;
        return personagem;
    }
    /* ========== MÉTODOS OBRIGATÓRIOS ========== */
    adicionarPersonagem(personagem) {
        const personagemExiste = this._personagens.some(p => p.nome === personagem.nome);
        if (personagemExiste) {
            throw new PersonagemComMesmoNomeError_1.default("Já existe um personagem com esse nome.");
        }
        this.definirId(personagem);
        this._personagens.push(personagem);
    }
    consultarPersonagem(nome) {
        const personagem = this._personagens.find(p => p.nome === nome);
        if (!personagem) {
            throw new PersonagemNaoEncontradoError_1.default(`Personagem '${nome}' não encontrado.`);
        }
        ;
        return personagem;
    }
    turno(atacanteId, alvoId) {
        const atacante = this.consultarPersonagemPorId(atacanteId);
        const alvo = this.consultarPersonagemPorId(alvoId);
        const acao = atacante.atacar(alvo);
        this.definirId(acao);
        this._acoes.push(acao);
        return [acao];
    }
    listarPersonagens() {
        return this._personagens;
    }
    listarAcoes() {
        return this._acoes;
    }
    verificarVencedor() {
        const vivos = this._personagens.filter(personagem => personagem.estaVivo());
        if (vivos.length > 1) {
            throw new BatalhaNaoFinalizadaError_1.default("A batalha ainda não terminou. Não é possível determinar o vencedor.");
        }
        if (vivos.length === 0) {
            throw new NaoHaVencedorError_1.default("Não há personagens vivos na batalha.");
        }
        return vivos[0];
    }
}
exports.default = Batalha;
