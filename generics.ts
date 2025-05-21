// Função Genérica
function primeiraLetra<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

let nomesArray = ["Alice", "Bob", "Charlie"];
let primeiroNome = primeiraLetra(nomesArray); // T é inferido como string
console.log(primeiroNome?.toUpperCase()); // OK, primeiroNome é string | undefined

let numerosArray = [10, 20, 30];
let primeiroNumero = primeiraLetra(numerosArray); // T é inferido como number
console.log(primeiroNumero); // OK, primeiroNumero é number | undefined

// Interface Genérica
interface RespostaAPI<Dados> {
    sucesso: boolean;
    dados: Dados;
    mensagemErro?: string;
}

interface Usuario {
    id: number;
    nome: string;
}

interface Produto {
    sku: string;
    preco: number;
}

let respostaUsuario: RespostaAPI<Usuario> = {
    sucesso: true,
    dados: { id: 1, nome: "Ana" }
};

let respostaProduto: RespostaAPI<Produto[]> = {
    sucesso: false,
    dados: [],
    mensagemErro: "Falha ao buscar produtos"
};

console.log(respostaUsuario.dados.nome);
// console.log(respostaUsuario.dados.preco); // Erro: Property 'preco' does not exist on type 'Usuario'.

// Classe Genérica (Exemplo Simples)
class Caixa<T> {
    private conteudo: T;

    constructor(valor: T) {
        this.conteudo = valor;
    }

    getConteudo(): T {
        return this.conteudo;
    }
}

let caixaDeString = new Caixa<string>("Olá TypeScript");
console.log(caixaDeString.getConteudo().toUpperCase());

let caixaDeNumero = new Caixa(123); // T inferido como number
console.log(caixaDeNumero.getConteudo() * 2);