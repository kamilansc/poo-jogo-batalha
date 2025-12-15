import Acao from "../batalha/Acao";

// ===== TELA INICIAL =====
export function telaInicial() {
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
export function telaMenuPrincipal() {
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
export function telaCriarPersonagemClasse() {
    console.log(`
        ========================================
                🧙 CRIAÇÃO DE PERSONAGEM
        ========================================
        Escolha a classe:

        [1] 🛡️ Guerreiro
        [2] 🔮 Mago
        [3] 🏹 Arqueiro
        ========================================
        `);
    }

export function telaCriarPersonagemNome() {
    console.log(`
        ========================================
                ✏️ NOME DO PERSONAGEM
        ========================================
        Digite o nome do personagem:
        ========================================
        `);
}

export function telaConfirmarCriacao() {
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

export function telaPersonagemCriado() {
    console.log(`
        ========================================
                🎉 PERSONAGEM CRIADO!
        ========================================
        O personagem foi adicionado à arena.
        ========================================
        `);
}

// ===== LISTAR PERSONAGENS =====
export function telaListarPersonagensVazio() {
    console.log(`
        ========================================
                📜 PERSONAGENS DA ARENA
        ========================================
        Nenhum personagem criado ainda.
        ========================================
        `);
}

export function telaListarPersonagens() {
    console.log(`
        ========================================
                📜 PERSONAGENS DA ARENA
        ========================================
        Nome | Classe | Vida
        ----------------------------------------
        `);
}

// ===== BATALHA =====
export function telaIniciarBatalha() {
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

export function telaBatalhaIniciada() {
    console.log(`
        ========================================
                ⚔️ BATALHA INICIADA!
        ========================================
        Que a luta comece!
        ========================================
        `);
}

export function telaEscolherAtacante() {
    console.log(`
        ========================================
                ⚔️ ESCOLHER ATACANTE
        ========================================
        `);
}

export function telaEscolherAtacado() {
    console.log(`
        ========================================
                🩸 ESCOLHER ATACADO
        ========================================
        `);
}

// ===== FIM =====
export function telaFimBatalha() {
    console.log(`
        ========================================
                🏆 FIM DA BATALHA
        ========================================
        `);
}

export function telaFimJogo() {
    console.log(`
        ========================================
            🏰 OBRIGADO POR JOGAR!
        ========================================
        `);
}

// ===== CRÔNICAS DA BATALHA =====
export function telaCronicas(acoes: Acao[]) {
    console.log(`
        ========================================
                📖 CRÔNICAS DA BATALHA
        ========================================
    `);
    if (acoes.length === 0) {
        console.log("\tNenhuma ação registrada.");
    } else {
        acoes.forEach((acao, index) => {
            console.log(`${index + 1} - ${acao.origem.nome} atacou ${acao.alvo.nome} causando ${acao.valorDano} de dano.`);
        });
    }
    console.log(`
        ========================================
    `);
}
