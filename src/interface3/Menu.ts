import readlineSync from "readline-sync";
import Batalha from "../batalha/Batalha";
import Personagem from "../personagens/Personagem";
import Acao from "../batalha/Acao";
import Guerreiro from "../personagens/Guerreiro";
import Arqueiro from "../personagens/Arqueiro";
import Mago from "../personagens/Mago";

// Importar telas
import * as Tela from "./Tela";

// Persistência
import PersonagemRepository from "../persistencia/PersonagemRepository";

// Exceções
import ValorInvalidoError from "../excecoes/ValorInvalidoError";
import PersonagemComMesmoNomeError from "../excecoes/PersonagemComMesmoNomeError";
import BatalhaNaoFinalizadaError from "../excecoes/BatalhaNaoFinalizadaError";
import NaoHaVencedorError from "../excecoes/NaoHaVencedorError";


// Array global de personagens
let personagens: Personagem[];
let batalha: Batalha | null;

function criarPersonagem() {
    Tela.telaCriarPersonagemClasse();
    const classe = readlineSync.question("\t>> Escolha a classe (1-3): ");

    Tela.telaCriarPersonagemNome();
    const nome = readlineSync.question("\t>> Digite o nome: ");

    let vida = Number(readlineSync.question("\t>> Vida (1-100): "));
    let ataque = Number(readlineSync.question("\t>> Ataque (1-100): "));

    let personagem: Personagem;
    try {
        if (classe === "1"){
            const defesa = readlineSync.questionInt("\t>> Defesa: ");
            personagem = new Guerreiro(defesa, nome, vida, ataque);
        }
        else if (classe === "2") {
            personagem = new Mago(nome, vida, ataque);
        }
        else if (classe === "3"){
            const ataqueMultiplo = readlineSync.questionInt("\t>> Ataque Múltiplo: ");
            personagem = new Arqueiro(nome, vida, ataque, ataqueMultiplo);
        }
        else {
            personagem = new Personagem(nome, vida, ataque);
        }
    } catch (erro) {
        if (erro instanceof Error) {
            console.log("❌ Erro ao criar personagem:", erro.message);
            return;
        }
    }

    Tela.telaConfirmarCriacao();
    const confirmar = readlineSync.question("\t>> Confirmar (1-Sim, 0-Cancelar): ");
    if (confirmar !== "1") return;

    try {
        batalha.adicionarPersonagem(personagem);
        Tela.telaPersonagemCriado();
    } catch (erro) {
        if (erro instanceof PersonagemComMesmoNomeError) {
            console.log(erro.message);
        }
    }
}

function listarPersonagens() {
    if (personagens.length === 0) {
        Tela.telaListarPersonagensVazio();
        return;
    }
    Tela.telaListarPersonagens();
    for (const p of personagens) {
        console.log(`\t${p.nome} | ${p.constructor.name} | ${p.vida}`);
    }
}

function iniciarBatalha() {
    if (!batalha || personagens.length < 2) {
        console.log("\t⚠️ É necessário ter pelo menos 2 personagens para iniciar a batalha.");
        return;
    }

    Tela.telaIniciarBatalha();
    const opcao = readlineSync.question("\t>> Escolha: ");
    if (opcao !== "1") return;

    Tela.telaBatalhaIniciada();

    let continua = true;
    while (continua) {
        listarPersonagens();
        Tela.telaEscolherAtacante();
        const atacanteNome = readlineSync.question("\t>> Digite o nome do atacante: ");
        Tela.telaEscolherAtacado();
        const alvoNome = readlineSync.question("\t>> Digite o nome do atacado: ");

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
            } catch (erro) {
                if (erro instanceof NaoHaVencedorError) {
                    console.log(erro.message);
                    return;
                }
            }
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("❌ Erro ao efetuar ataque:", erro.message);
            }
        }
    }
};

function main() {
    personagens = PersonagemRepository.carregar();
    batalha = new Batalha(personagens);

    Tela.telaInicial();
    readlineSync.question("\tPressione ENTER para continuar...");

    let sair = false;
    while (!sair) {
        Tela.telaMenuPrincipal();
        const escolha = readlineSync.question("\t>> Opcao: ");

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
                    PersonagemRepository.salvar([]);
                }
                else {
                    PersonagemRepository.salvar(batalha.personagens);
                }
                Tela.telaFimJogo();
                break;
            default:
                console.log("Opção inválida!");
        }
    }
}

main();
