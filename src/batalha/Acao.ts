import IdJaExisteError from "../excecoes/IdJaExisteError";
import Personagem from "../personagens/Personagem";

export default class Acao {
    private _id!: number;
    private _origem: Personagem;
    private _alvo: Personagem;
    private _descricao: string;
    private _valorDano: number;
    private _dataHora: Date;

    // SNAPSHOTS (estado congelado)
    private _vidaOrigemNoMomento: number;
    private _vidaAlvoNoMomento: number;

    constructor(origem: Personagem, alvo: Personagem, descricao: string, valorDano: number) {
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
    set id(id: number) {
        if (this._id !== undefined) {
            throw new IdJaExisteError("ID da ação já definido.");
        }

        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    get origem(): Personagem {
        return this._origem;
    }

    get alvo(): Personagem {
        return this._alvo;
    }

    get valorDano(): number {
        return this._valorDano;
    }


}