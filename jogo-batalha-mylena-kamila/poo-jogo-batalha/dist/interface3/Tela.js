"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telaInicial = telaInicial;
exports.telaMenuPrincipal = telaMenuPrincipal;
exports.telaCriarPersonagemClasse = telaCriarPersonagemClasse;
exports.telaCriarPersonagemNome = telaCriarPersonagemNome;
exports.telaConfirmarCriacao = telaConfirmarCriacao;
exports.telaPersonagemCriado = telaPersonagemCriado;
exports.telaListarPersonagensVazio = telaListarPersonagensVazio;
exports.telaListarPersonagens = telaListarPersonagens;
exports.telaIniciarBatalha = telaIniciarBatalha;
exports.telaBatalhaIniciada = telaBatalhaIniciada;
exports.telaEscolherAtacante = telaEscolherAtacante;
exports.telaEscolherAtacado = telaEscolherAtacado;
exports.telaFimBatalha = telaFimBatalha;
exports.telaFimJogo = telaFimJogo;
exports.telaCronicas = telaCronicas;
// ===== TELA INICIAL =====
function telaInicial() {
    console.log(`
        ========================================
                ⚔️  ARENA DOS REINOS ⚔️
        ========================================
        Um RPG de batalha em turnos
        Guerreiros, Magos e Arqueiros

        Pressione ENTER para começar
        ========================================
        `);
}
// ===== MENU PRINCIPAL =====
function telaMenuPrincipal() {
    console.log(`
        ========================================
                    🏰 MENU PRINCIPAL
        ========================================
        [1] Criar personagem
        [2] Listar personagens
        [3] Iniciar batalha
        [4] Listar histórico
        [0] Sair
        ========================================
        Escolha uma opção:
        `);
}
// ===== CRIAR PERSONAGEM =====
function telaCriarPersonagemClasse() {
    console.log(`
        ========================================
                🧙 CRIAÇÃO DE PERSONAGEM
        ========================================
        Escolha a classe:

        [1] 🛡️  Guerreiro
        [2] 🔮 Mago
        [3] 🏹 Arqueiro
        [4] ☠️  Letalis
        ========================================
        `);
}
function telaCriarPersonagemNome() {
    console.log(`
        ========================================
                ✏️ NOME DO PERSONAGEM
        ========================================
        Digite o nome do personagem:
        ========================================
        `);
}
function telaConfirmarCriacao() {
    console.log(`
        ========================================
                    ✅ CONFIRMAÇÃO
        ========================================
        Confirmar criação?

        [1] Sim
        [0] Cancelar
        ========================================
        `);
}
function telaPersonagemCriado() {
    console.log(`
        ========================================
                🎉 PERSONAGEM CRIADO!
        ========================================
        O personagem foi adicionado à arena.
        ========================================
        `);
}
// ===== LISTAR PERSONAGENS =====
function telaListarPersonagensVazio() {
    console.log(`
        ========================================
                📜 PERSONAGENS DA ARENA
        ========================================
        Nenhum personagem criado ainda.
        ========================================
        `);
}
function telaListarPersonagens() {
    console.log(`
        ========================================
                📜 PERSONAGENS DA ARENA
        ========================================
        Nome | Classe | Vida
        ----------------------------------------
        `);
}
// ===== BATALHA =====
function telaIniciarBatalha() {
    console.log(`
        ========================================
                ⚔️ INICIAR BATALHA
        ========================================
        Deseja iniciar a batalha?

        [1] Sim
        [0] Voltar
        ========================================
        `);
}
function telaBatalhaIniciada() {
    console.log(`
        ========================================
                ⚔️ BATALHA INICIADA!
        ========================================
        Que a luta comece!
        ========================================
        `);
}
function telaEscolherAtacante() {
    console.log(`
        ========================================
                ⚔️ ESCOLHER ATACANTE
        ========================================
        `);
}
function telaEscolherAtacado() {
    console.log(`
        ========================================
                🩸 ESCOLHER ATACADO
        ========================================
        `);
}
// ===== FIM =====
function telaFimBatalha() {
    console.log(`
        ========================================
                🏆 FIM DA BATALHA
        ========================================
        `);
}
function telaFimJogo() {
    console.log(`
        ========================================
            🏰 OBRIGADO POR JOGAR!
        ========================================
        `);
}
// ===== CRÔNICAS DA BATALHA =====
function telaCronicas(acoes) {
    console.log(`
        ========================================
                📖 CRÔNICAS DA BATALHA
        ========================================
    `);
    if (acoes.length === 0) {
        console.log("\tNenhuma ação registrada.");
    }
    else {
        acoes.forEach((acao, index) => {
            console.log(`${index + 1} - ${acao.origem.nome} atacou ${acao.alvo.nome} causando ${acao.valorDano} de dano.`);
        });
    }
    console.log(`
        ========================================
    `);
}
