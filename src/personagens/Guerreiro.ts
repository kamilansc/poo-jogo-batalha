import Personagem from "./Personagem";
import Acao from "../batalha/Acao";


export default class Guerreiro extends Personagem {
    private _defesa: number;


    constructor(defesa: number, id: number, nome: string, vida: number, ataque: number ) {
        super(id, nome, vida, ataque)
        this._defesa = defesa;
    }

    get defesa(): number {
        return this._defesa;
    }

    receberDano(valorAtaque: number): void {
        if (valorAtaque < this.ataque) {
            return;
        }

        this._defesa -= valorAtaque;

        if (this._defesa < 0) {
            let restoataque = Math.abs(this._defesa);
            this._defesa = 0;
            super.receberDano(restoataque);

        }

    }

    atacar(alvo: Personagem): Acao {
        let dano = this.ataque;
        if (this.vida <= 100 * 0.3 ) {
            dano *= 1.30;

        }
        alvo.receberDano(dano);

        return new Acao(1,this, alvo,"Ataque do Guerreiro", dano);

    }

} 



let kratos = new Guerreiro(50,1,"Conan", 100,30);
console.log("==========================================");
console.log("⚔️  INICIANDO OS TESTES DO GUERREIRO ⚔️");
console.log("==========================================");
console.log("STATUS INICIAL:", kratos);

// ---------------------------------------------------------
// TESTE 1: O Ataque Fraco (Regra do "não surtirá efeito")
// O ataque do inimigo (10) é MENOR que o ataque do Kratos (20).
// ---------------------------------------------------------
console.log("\n>>> TESTE 1: Inimigo fraco ataca com 10 de força");
kratos.receberDano(10); 
console.log("ESPERADO: Vida 100, Defesa 50 (Nada mudou)");
console.log("RESULTADO:", kratos);


// ---------------------------------------------------------
// TESTE 2: O Dano no Escudo (Regra da absorção)
// O ataque (30) é MAIOR que o do Kratos (20), então acerta.
// Mas é MENOR que a Defesa (50), então só tira escudo.
// ---------------------------------------------------------
console.log("\n>>> TESTE 2: Inimigo médio ataca com 30 de força");
kratos.receberDano(30);
console.log("ESPERADO: Vida 100, Defesa 20 (50 - 30)");
console.log("RESULTADO:", kratos);


// ---------------------------------------------------------
// TESTE 3: O Quebra-Escudo (Regra do dano excedente)
// O ataque (40) é MAIOR que a Defesa restante (20).
// O escudo zera e o resto (20) vai para a vida.
// ---------------------------------------------------------
console.log("\n>>> TESTE 3: Inimigo forte ataca com 40 de força");
kratos.receberDano(40);
console.log("ESPERADO: Defesa 0, Vida 80 (100 - 20 de sobra)");
console.log("RESULTADO:", kratos);

console.log("\n==========================================");
console.log("✅ FIM DOS TESTES");