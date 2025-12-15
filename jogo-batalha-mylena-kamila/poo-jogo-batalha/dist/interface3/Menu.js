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
const readline_sync_1 = __importDefault(require("readline-sync"));
const Batalha_1 = __importDefault(require("../batalha/Batalha"));
const Personagem_1 = __importDefault(require("../personagens/Personagem"));
const Guerreiro_1 = __importDefault(require("../personagens/Guerreiro"));
const Arqueiro_1 = __importDefault(require("../personagens/Arqueiro"));
const Mago_1 = __importDefault(require("../personagens/Mago"));
// Importar telas
const Tela = __importStar(require("./Tela"));
// Persistência
const PersonagemRepository_1 = __importDefault(require("../persistencia/PersonagemRepository"));
const PersonagemComMesmoNomeError_1 = __importDefault(require("../excecoes/PersonagemComMesmoNomeError"));
const NaoHaVencedorError_1 = __importDefault(require("../excecoes/NaoHaVencedorError"));
const Letalis_1 = __importDefault(require("../personagens/Letalis"));
// Array global de personagens
let personagens;
let batalha;
function criarPersonagem() {
    Tela.telaCriarPersonagemClasse();
    const classe = readline_sync_1.default.question("\t>> Escolha a classe (1-4): ");
    Tela.telaCriarPersonagemNome();
    const nome = readline_sync_1.default.question("\t>> Digite o nome: ");
    let vida = Number(readline_sync_1.default.question("\t>> Vida (1-100): "));
    let ataque;
    if (classe !== "4") {
        ataque = Number(readline_sync_1.default.question("\t>> Ataque (1-100): "));
    }
    let personagem;
    try {
        if (classe === "1") {
            const defesa = readline_sync_1.default.questionInt("\t>> Defesa: ");
            personagem = new Guerreiro_1.default(defesa, nome, vida, ataque);
        }
        else if (classe === "2") {
            personagem = new Mago_1.default(nome, vida, ataque);
        }
        else if (classe === "3") {
            const ataqueMultiplo = readline_sync_1.default.questionInt("\t>> Ataque Múltiplo: ");
            personagem = new Arqueiro_1.default(nome, vida, ataque, ataqueMultiplo);
        }
        // =========== LETALIS ========
        else if (classe === "4") {
            personagem = new Letalis_1.default(nome, vida);
        }
        else {
            personagem = new Personagem_1.default(nome, vida, ataque);
        }
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.log("\t❌ Erro ao criar personagem:", erro.message);
            return;
        }
    }
    Tela.telaConfirmarCriacao();
    const confirmar = readline_sync_1.default.question("\t>> Confirmar (1-Sim, 0-Cancelar): ");
    if (confirmar !== "1")
        return;
    try {
        batalha.adicionarPersonagem(personagem);
        Tela.telaPersonagemCriado();
    }
    catch (erro) {
        if (erro instanceof PersonagemComMesmoNomeError_1.default) {
            console.log(erro.message);
        }
    }
}
function listarPersonagens() {
    const personagens = batalha.listarPersonagens();
    if (personagens.length === 0) {
        Tela.telaListarPersonagensVazio();
        return;
        '';
    }
    Tela.telaListarPersonagens();
    for (const p of personagens) {
        console.log(`\t${p.nome} | ${p.constructor.name} | ${p.vida}`);
    }
}
function iniciarBatalha() {
    if (!batalha || personagens.length < 2) {
        console.log("\t⚠️ É necessário ter pelo menos 2 personagens para iniciar a batalha⚠️");
        return;
    }
    Tela.telaIniciarBatalha();
    const opcao = readline_sync_1.default.question("\t>> Escolha: ");
    if (opcao !== "1")
        return;
    Tela.telaBatalhaIniciada();
    let continua = true;
    while (continua) {
        listarPersonagens();
        Tela.telaEscolherAtacante();
        const atacanteNome = readline_sync_1.default.question("\t>> Digite o nome do atacante: ");
        Tela.telaEscolherAtacado();
        const alvoNome = readline_sync_1.default.question("\t>> Digite o nome do atacado: ");
        try {
            const atacante = batalha.consultarPersonagem(atacanteNome);
            const alvo = batalha.consultarPersonagem(alvoNome);
            const acoes = batalha.turno(atacante.id, alvo.id);
            console.log("\tAção realizada:");
            acoes.forEach(a => console.log(`\t${a.origem.nome} atacou ${a.alvo.nome} causando ${a.valorDano} de dano.`));
            // Verificar vencedor
            try {
                const vencedor = batalha.verificarVencedor();
                console.log(`\t🏆 Vencedor: ${vencedor.nome}`);
                continua = false;
                Tela.telaFimBatalha();
            }
            catch (erro) {
                if (erro instanceof NaoHaVencedorError_1.default) {
                    console.log(erro.message);
                    return;
                }
            }
        }
        catch (erro) {
            if (erro instanceof Error) {
                console.log("\t❌ Erro ao efetuar ataque:", erro.message);
            }
        }
    }
}
;
function main() {
    personagens = PersonagemRepository_1.default.carregar();
    batalha = new Batalha_1.default(personagens);
    Tela.telaInicial();
    readline_sync_1.default.question("\tPressione ENTER para continuar...");
    let sair = false;
    while (!sair) {
        Tela.telaMenuPrincipal();
        const escolha = readline_sync_1.default.question("\t>> Opcao: ");
        switch (escolha) {
            case "1":
                criarPersonagem();
                break;
            case "2":
                listarPersonagens();
                break;
            case "3":
                iniciarBatalha();
                break;
            case "4":
                Tela.telaCronicas(batalha.listarAcoes());
                break;
            case "0":
                sair = true;
                if (!batalha) {
                    PersonagemRepository_1.default.salvar([]);
                }
                else {
                    PersonagemRepository_1.default.salvar(batalha.personagens);
                }
                Tela.telaFimJogo();
                break;
            default:
                console.log("Opção inválida!");
        }
    }
}
main();
