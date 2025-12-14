import Personagem from "../personagens/Personagem";
import Acao from "./Acao";

export default class Batalha {
    private _personagens: Personagem[];
    private _acoes: Acao[];

    constructor(personagens: Personagem[]) {
        this._personagens = personagens;
        this._acoes = [];
    }

    adicionarPersonagem(personagem: Personagem) {
        const personagemExiste: boolean = this._personagens.some(
            p => p.nome === personagem.nome
        );

        if (personagemExiste) {
        }
    }
}