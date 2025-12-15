import { 
  telaInicial,
  telaMenuPrincipal,
  telaCriarPersonagemClasse,
  telaCriarPersonagemNome,
  telaConfirmarCriacao,
  telaPersonagemCriado,
  telaListarPersonagensVazio,
  telaIniciarBatalhaConfirmacao,
  telaIniciarBatalhaErro,
  telaBatalhaIniciada,
  telaEscolherAtacante,
  telaEscolherAtacado,
  telaCronicas
} from "./Telas";

import Personagem from "../personagens/Personagem";
import Guerreiro from "../personagens/Guerreiro";
import Mago from "../personagens/Mago";
import Arqueiro from "../personagens/Arqueiro";
import Batalha from "../batalha/Batalha";
import { esperarEnter, lerNumero, lerTexto } from "./input";


const batalha = new Batalha([]);

export function iniciarApp() {
  console.clear();
  telaInicial();
  esperarEnter();
  menuPrincipal();
}

export function menuPrincipal() {
  console.clear();
  telaMenuPrincipal();

  const opcao = lerNumero();

  switch (opcao) {
    case 1:
      criarPersonagem();
      break;
    case 2:
        listarPersonagens();
        break;
    case 3:
        iniciarBatalha();
        break;
    case 0:
        console.clear();
        console.log("Encerrando jogo...");
        esperarEnter();
        return;
    default:
      menuPrincipal();
  }
}

function criarPersonagem() {
  console.clear();
  telaCriarPersonagemClasse();
  const opcaoClasse = lerNumero();

  let classe = "";
  if (opcaoClasse === 1) classe = "🛡️ Guerreiro";
  if (opcaoClasse === 2) classe = "🔮 Mago";
  if (opcaoClasse === 3) classe = "🏹 Arqueiro";

  console.clear();
  telaCriarPersonagemNome();
  const nome = lerTexto();

  console.clear();
  telaConfirmarCriacao(nome, classe);
  const confirmar = lerNumero();

  if (confirmar === 1) {
    let personagem: Personagem | undefined;

        switch (opcaoClasse) {
        case 1:
            personagem = new Guerreiro(50, nome, 100, 20);
            break;
        case 2:
            personagem = new Mago(nome, 100, 25);
            break;
        case 3:
            personagem = new Arqueiro(nome, 100, 15, 2);
            break;
        default:
            criarPersonagem();
            return;
        }

        batalha.adicionarPersonagem(personagem);

    console.clear();
    telaPersonagemCriado(nome);
    esperarEnter();
    menuPrincipal();
    return;
    }

    if (confirmar === 0) {
    menuPrincipal();
    return;
    }

    criarPersonagem();
}

function listarPersonagens() {
  console.clear();

  const personagens = batalha.listarPersonagens();

  if (personagens.length === 0) {
    telaListarPersonagensVazio();
    esperarEnter();
    menuPrincipal();
    return;
  }

    console.log(`
    ╔════════════════════════════════════════════╗
    ║           📜 PERSONAGENS DA ARENA          ║
    ╠════════════════════════════════════════════╣
    `);

    let vivos = 0;
    let mortos = 0;

    personagens.forEach((p, index) => {
        const status = p.estaVivo() ? `❤️ ${p.vida}` : "💀 Morto";
        if (p.estaVivo()) vivos++; else mortos++;

        console.log(
        `║ ${index + 1}) ${p.nome.padEnd(10)} | ${status.padEnd(10)} ║`
        );
    });

    console.log(`
    ║                                            ║
    ║  Vivos: ${vivos}  |  Mortos: ${mortos}                    ║
    ║                                            ║
    ║  [ 0 ] Voltar ao menu principal            ║
    ║                                            ║
    ╚════════════════════════════════════════════╝
    `);

  esperarEnter();
  menuPrincipal();
}

function iniciarBatalha() {
    console.clear();
    const personagens = batalha.listarPersonagens();
    const vivos = personagens.filter(p => p.estaVivo());

    if (vivos.length < 2) {
        telaIniciarBatalhaErro();
        esperarEnter();
        menuPrincipal();
        return;
    }

    // Chama a tela de confirmação de batalha
    telaIniciarBatalhaConfirmacao(batalha);

    const confirmar = lerNumero();

    if (confirmar === 1) {
        console.clear();
        telaBatalhaIniciada();
        esperarEnter();
        executarTurno(); // Começa a execução da batalha
        return;
    }

    menuPrincipal();
}

// function iniciarBatalha() {
//   console.clear();

//   const personagens = batalha.listarPersonagens();
//   const vivos = personagens.filter(p => p.estaVivo());

//   if (vivos.length < 2) {
//     telaIniciarBatalhaErro();
//     esperarEnter();
//     menuPrincipal();
//     return;
//   }
//   telaIniciarBatalhaConfirmacao();
//   const confirmar = lerNumero();

//   if (confirmar === 1) {
//     console.clear();
//     telaBatalhaIniciada();
//     esperarEnter();
//     executarTurno();; 
//     return;
//   }

//   menuPrincipal();
// }

function executarTurno() {
  console.clear();

  const personagens = batalha.listarPersonagens();
  const vivos = personagens.filter(p => p.estaVivo());

  if (vivos.length < 2) {
   console.clear();

  try {
    const vencedor = batalha.verificarVencedor();
    console.log(`
    ╔════════════════════════════════════════════╗
    ║            🏆 FIM DA BATALHA               ║
    ╠════════════════════════════════════════════╣
    ║                                            ║
    ║  ${vencedor.nome} foi o último de pé!      ║
    ║                                            ║
    ╚════════════════════════════════════════════╝
    `);
    } catch {
        console.log(`
    ╔════════════════════════════════════════════╗
    ║            ☠️ FIM DA BATALHA               ║
    ╠════════════════════════════════════════════╣
    ║                                            ║
    ║  Nenhum personagem sobreviveu.             ║
    ║                                            ║
    ╚════════════════════════════════════════════╝
    `);
    }
     esperarEnter();
     telaCronicas(batalha.acoes);
     esperarEnter();
     menuPrincipal();
     return;
}


  // ===== Escolher ATACANTE =====
  telaEscolherAtacante();
  vivos.forEach(p => {
    console.log(`[${p.id}] ${p.nome} | ❤️ ${p.vida}`);
  });
  const atacanteId = lerNumero();

  // ===== Escolher ATACADO =====
  console.clear();
  telaEscolherAtacado();
  vivos.forEach(p => {
    console.log(`[${p.id}] ${p.nome} | ❤️ ${p.vida}`);
  });
  const alvoId = lerNumero();

  // ===== Executar TURNO =====
  try {
    const acoes = batalha.turno(atacanteId, alvoId);

    const acao = acoes[0];
    if (!acao) {
    menuPrincipal();
    return;
    }

    console.clear();
        console.log(`
    ╔════════════════════════════════════════════╗
    ║           📜 RESULTADO DO TURNO            ║
    ╠════════════════════════════════════════════╣
    ║                                            ║
    ║  ${acao.origem.nome} atacou ${acao.alvo.nome}
    ║                                            ║
    ║  Dano causado: ${acao.valorDano}
    ║                                            ║
    ║  Vida atual de ${acao.alvo.nome}: ${acao.alvo.vida}
    ║                                            ║
    ╚════════════════════════════════════════════╝
    `);

    esperarEnter();
    executarTurno();
  } catch (error) {
    console.clear();

    if (error instanceof Error) {
      console.log(error.message);
    }

    esperarEnter();
    executarTurno();
  }
}



