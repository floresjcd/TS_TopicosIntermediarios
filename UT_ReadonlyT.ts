interface Configuracao {
    apiUrl: string;
    maxConexoes: number;
}

const configInicial: Readonly<Configuracao> = {
    apiUrl: "https://api.example.com",
    maxConexoes: 10
};
// configInicial.apiUrl = "http://localhost"; // Erro: Cannot assign to 'apiUrl' because it is a read-only property.