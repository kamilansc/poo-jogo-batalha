import readline from "readline-sync";

export function lerNumero(): number {
  return Number(readline.question("> "));
}

export function lerTexto(): string {
  return readline.question("> ");
}

export function esperarEnter(): void {
  readline.question("\nPressione ENTER para continuar...");
}
