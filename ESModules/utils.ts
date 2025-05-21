export function ehPar(numero: number): boolean {
    return numero % 2 === 0;
}

export const PI: number = 3.14159;

export default function saudacaoPadrao(nome: string): string { // Exportação padrão
    return `Olá, ${nome}! Bem-vindo(a)!`;
}