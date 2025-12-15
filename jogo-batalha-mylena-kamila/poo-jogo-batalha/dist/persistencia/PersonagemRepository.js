"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const Guerreiro_1 = __importDefault(require("../personagens/Guerreiro"));
const Mago_1 = __importDefault(require("../personagens/Mago"));
const Arqueiro_1 = __importDefault(require("../personagens/Arqueiro"));
const Letalis_1 = __importDefault(require("../personagens/Letalis"));
class PersonagemRepository {
    static caminho = path.join(__dirname, "..", "..", "dados", "personagens.json");
    static salvar(personagens) {
        const dados = personagens.map(p => p.TransformarEmJson());
        fs_1.default.writeFileSync(this.caminho, JSON.stringify(dados, null, 2));
    }
    static carregar() {
        if (!fs_1.default.existsSync(this.caminho)) {
            return [];
        }
        const conteudo = fs_1.default.readFileSync(this.caminho, "utf-8");
        const dados = JSON.parse(conteudo);
        return dados.map((personagem) => {
            if (personagem.vida <= 0) {
                return null;
            }
            let p;
            switch (personagem.tipo) {
                case "Guerreiro":
                    p = new Guerreiro_1.default(personagem.defesa, personagem.nome, personagem.vida, personagem.ataque);
                    break;
                case "Mago":
                    p = new Mago_1.default(personagem.nome, personagem.vida, personagem.ataque);
                    break;
                case "Arqueiro":
                    p = new Arqueiro_1.default(personagem.nome, personagem.vida, personagem.ataque, personagem.ataqueMultiplo);
                    break;
                case "Letalis":
                    p = new Letalis_1.default(personagem.nome, personagem.vida);
                    break;
                default:
                    throw new Error("Tipo de personagem desconhecido");
            }
            // Restaurar o ID salvo no JSON
            p["_id"] = personagem.id;
            return p;
        })
            .filter((p) => p !== null);
    }
}
exports.default = PersonagemRepository;
