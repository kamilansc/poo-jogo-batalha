"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IdJaExisteError_1 = __importDefault(require("../excecoes/IdJaExisteError"));
class Acao {
    _id;
    _origem;
    _alvo;
    _descricao;
    _valorDano;
    _dataHora;
    // SNAPSHOTS (estado congelado)
    _vidaOrigemNoMomento;
    _vidaAlvoNoMomento;
    constructor(origem, alvo, descricao, valorDano) {
        this._origem = origem;
        this._alvo = alvo;
        this._descricao = descricao;
        this._valorDano = valorDano;
        this._dataHora = new Date();
        // Congela o estado das variáveis origem.vida e alvo.vida para guardar a vida dos
        // personagens no momento da ação.
        this._vidaOrigemNoMomento = origem.vida;
        this._vidaAlvoNoMomento = alvo.vida;
    }
    /* ========== GET E SET DO ID DEFINIDO EM BATALHA ========== */
    set id(id) {
        if (this._id !== undefined) {
            throw new IdJaExisteError_1.default("ID da ação já definido.");
        }
        this._id = id;
    }
    get id() {
        return this._id;
    }
    get origem() {
        return this._origem;
    }
    get alvo() {
        return this._alvo;
    }
    get valorDano() {
        return this._valorDano;
    }
}
exports.default = Acao;
