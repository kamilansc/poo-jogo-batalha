import Personagem from "../personagens/Personagem";

export default class Acao {
    private _id: number;
    private _origem: Personagem;
    private _alvo: Personagem;
    private _descricao: string;
    private _valorDano: number;
    private _dataHora: Date;

    constructor(id: number, origem: Personagem, alvo: Personagem, descricao: string, valorDano: number) {
        this._id = id;
        this._origem = origem;
        this._alvo = alvo;
        this._descricao = descricao;
        this._valorDano = valorDano;
        this._dataHora = new Date()
    }
}