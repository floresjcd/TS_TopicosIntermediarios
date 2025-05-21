interface PerfilUsuario {
    id: number;
    nome: string;
    email: string;
    dataNascimento: Date;
    endereco: string;
}

type InfoSensivelRemovida = Omit<PerfilUsuario, "dataNascimento" | "endereco">;
let usuarioPublico: InfoSensivelRemovida = {
    id: 2,
    nome: "Ana",
    email: "ana@example.com"
};