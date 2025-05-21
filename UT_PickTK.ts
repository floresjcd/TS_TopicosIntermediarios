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