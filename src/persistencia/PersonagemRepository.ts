import fs from "fs";
import * as path from "path";
import Personagem from "../personagens/Personagem";
import Guerreiro from "../personagens/Guerreiro";
import Mago from "../personagens/Mago";
import Arqueiro from "../personagens/Arqueiro";

export default class PersonagemRepository {

  private static caminho = path.join(__dirname, "..", "..", "dados", "personagens.json");

  static salvar(personagens: Personagem[]): void {
    const dados = personagens.map(p => p.TransformarEmJson());

    fs.writeFileSync(this.caminho, JSON.stringify(dados, null, 2));
  }

  static carregar(): Personagem[] {
    if (!fs.existsSync(this.caminho)) {
      return [];
    }

    const conteudo = fs.readFileSync(this.caminho, "utf-8");
    const dados = JSON.parse(conteudo);

    return dados.map((personagem: any) => {
      let p: Personagem;

      switch (personagem.tipo) {
        case "Guerreiro":
          p = new Guerreiro(personagem.defesa, personagem.nome, personagem.vida, personagem.ataque);
          break;
        case "Mago":
          p = new Mago(personagem.nome, personagem.vida, personagem.ataque);
          break;
        case "Arqueiro":
          p = new Arqueiro(personagem.nome, personagem.vida, personagem.ataque, personagem.ataqueMultiplo);
          break;
        default:
          throw new Error("Tipo de personagem desconhecido");
      }

      // Restaurar o ID salvo no JSON
      p["_id"] = personagem.id;

      return p;
    });
}

}
