// Enum numérico (valores padrão: 0, 1, 2...)
enum Direcao {
  Norte, // 0
  Leste, // 1
  Sul, // 2
  Oeste, // 3
}
let dir: Direcao = Direcao.Norte;
console.log(dir); // 0
console.log(Direcao[0]); // "Norte"

// Enum numérico com valores customizados
enum CodigoStatus {
  Sucesso = 200,
  NaoEncontrado = 404,
  ErroServidor = 500,
}
let statusReq: CodigoStatus = CodigoStatus.NaoEncontrado;
console.log(statusReq); // 404

// Enum de String (mais legível em logs, debugging)
enum NivelLog {
  Info = "INFO",
  Warning = "WARN",
  Error = "ERROR",
}
function logar(mensagem: string, nivel: NivelLog): void {
  console.log(`[${nivel}] ${mensagem}`);
}
logar("Usuário não encontrado", NivelLog.Warning); // [WARN] Usuário não encontrado
