### 3. Tópicos Intermediários

**Enums**  
Permitem definir um conjunto de constantes nomeadas. Podem ser numéricos (padrão) ou baseados em strings.

```typescript
// Enum numérico (valores padrão: 0, 1, 2...)
enum Direcao {
    Norte,    // 0
    Leste,    // 1
    Sul,      // 2
    Oeste     // 3
}
let dir: Direcao = Direcao.Norte;
console.log(dir); // 0
console.log(Direcao[0]); // "Norte"

// Enum numérico com valores customizados
enum CodigoStatus {
    Sucesso = 200,
    NaoEncontrado = 404,
    ErroServidor = 500
}
let statusReq: CodigoStatus = CodigoStatus.NaoEncontrado;
console.log(statusReq); // 404

// Enum de String (mais legível em logs, debugging)
enum NivelLog {
    Info = "INFO",
    Warning = "WARN",
    Error = "ERROR"
}
function logar(mensagem: string, nivel: NivelLog): void {
    console.log(`[${nivel}] ${mensagem}`);
}
logar("Usuário não encontrado", NivelLog.Warning); // [WARN] Usuário não encontrado
```

**Generics**  
Permitem criar componentes (funções, classes, interfaces) que podem trabalhar com uma variedade de tipos, em vez de um único. Aumenta a reutilização de código mantendo a segurança de tipo.

```typescript
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
```

**Módulos (ES Modules: `import`/`export`)**  
TypeScript usa a sintaxe de módulos do ES6 para organizar o código.

*   `utils.ts`:
    ```typescript
    export function ehPar(numero: number): boolean {
        return numero % 2 === 0;
    }

    export const PI: number = 3.14159;

    export default function saudacaoPadrao(nome: string): string { // Exportação padrão
        return `Olá, ${nome}! Bem-vindo(a)!`;
    }
    ```

*   `app.ts`:
    ```typescript
    import saudacaoPadrao, { ehPar, PI as constantePI } from './utils';
    //      ^-- import default  ^-- imports nomeados (podem ser renomeados com 'as')

    console.log(saudacaoPadrao("Estudante"));
    console.log(`O número 4 é par? ${ehPar(4)}`);
    console.log(`Valor de PI: ${constantePI}`);
    ```
    *Professor explica que para executar isso no Node.js, pode ser necessário configurar `tsconfig.json` para `module: "CommonJS"` ou usar ferramentas como `ts-node`, ou configurar o `package.json` com `"type": "module"` e `tsconfig.json` com `module: "ESNext"`.*

**Utility Types**  
TypeScript vem com tipos utilitários que ajudam a transformar tipos existentes.

*   **`Partial<T>`:** Constrói um tipo com todas as propriedades de `T` definidas como opcionais.
    ```typescript
    interface Tarefa {
        id: number;
        titulo: string;
        descricao: string;
        concluida: boolean;
    }

    function atualizarTarefa(id: number, atualizacoes: Partial<Tarefa>): void {
        // Lógica para buscar a tarefa pelo id e aplicar atualizações
        console.log(`Atualizando tarefa ${id} com:`, atualizacoes);
        // Ex: if (atualizacoes.titulo) { tarefa.titulo = atualizacoes.titulo; }
    }

    atualizarTarefa(1, { descricao: "Nova descrição...", concluida: true });
    // Não precisa passar todas as propriedades de Tarefa
    ```

*   **`Readonly<T>`:** Constrói um tipo com todas as propriedades de `T` definidas como `readonly`.
    ```typescript
    interface Configuracao {
        apiUrl: string;
        maxConexoes: number;
    }

    const configInicial: Readonly<Configuracao> = {
        apiUrl: "https://api.example.com",
        maxConexoes: 10
    };
    // configInicial.apiUrl = "http://localhost"; // Erro: Cannot assign to 'apiUrl' because it is a read-only property.
    ```

*   **`Pick<T, K>`:** Constrói um tipo selecionando um conjunto de propriedades `K` de `T`.
    ```typescript
    interface PerfilUsuario {
        id: number;
        nome: string;
        email: string;
        dataNascimento: Date;
        endereco: string;
    }

    type PreviewUsuario = Pick<PerfilUsuario, "id" | "nome" | "email">;

    let usuarioPreview: PreviewUsuario = {
        id: 1,
        nome: "Carlos",
        email: "carlos@example.com"
        // dataNascimento: new Date() // Erro: 'dataNascimento' não existe em PreviewUsuario
    };
    ```
*   **`Omit<T, K>`:** Constrói um tipo removendo um conjunto de propriedades `K` de `T`.
    ```typescript
    type InfoSensivelRemovida = Omit<PerfilUsuario, "dataNascimento" | "endereco">;
    let usuarioPublico: InfoSensivelRemovida = {
        id: 2,
        nome: "Ana",
        email: "ana@example.com"
    };
    ```

---

### Ferramentas

**Compilador TypeScript (`tsc`) e `tsconfig.json`**  
*   **Comandos `tsc`:**
    *   `tsc nome_arquivo.ts`: Compila um único arquivo.
    *   `tsc`: Compila todos os arquivos `.ts` no projeto (se houver `tsconfig.json`).
    *   `tsc -w` ou `tsc --watch`: Modo de observação, recompila automaticamente ao salvar arquivos.
*   **`tsconfig.json`:** Arquivo de configuração do compilador TypeScript.
    *   Gerar um `tsconfig.json` básico: `tsc --init`  
    
        ```json
        {
          "compilerOptions": {
            "target": "ES2016",  // Versão do JS para qual compilar (ex: ES5, ES6, ES2020, ESNext)
            "module": "CommonJS", // Sistema de módulos (ex: CommonJS, ES6, ESNext, AMD)
            "outDir": "./dist",   // Pasta de saída para os arquivos .js compilados
            "rootDir": "./src",   // Pasta raiz dos arquivos .ts de entrada
            "strict": true,       // Habilita todas as opções de checagem estrita (MUITO RECOMENDADO)
                                  // Inclui strictNullChecks, noImplicitAny, etc.
            "esModuleInterop": true, // Facilita a interoperabilidade com módulos CommonJS
            "skipLibCheck": true,    // Pula a checagem de tipos de arquivos de declaração (.d.ts) de bibliotecas
            "forceConsistentCasingInFileNames": true // Garante consistência no casing de nomes de arquivos
          },
          "include": ["src/**/*"], // Padrões para incluir arquivos na compilação
          "exclude": ["node_modules", "**/*.spec.ts"] // Padrões para excluir arquivos
        }
        ```
  
