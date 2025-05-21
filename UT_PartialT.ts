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