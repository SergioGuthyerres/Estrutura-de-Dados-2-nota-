const PrintQueue = require("./solucaoListaEncadeada");
// Função auxiliar para separar os testes visualmente no console
function logHeader(title) {
  console.log(
    `\n=============================================================`
  );
  console.log(`>>> ${title}`);
  console.log(`=============================================================`);
}

// Instanciando a Fila de Impressão
const printer = new PrintQueue();

console.log("INICIANDO SIMULAÇÃO DO SISTEMA DE IMPRESSÃO - OFFICE 3000");

// ---------------------------------------------------------
// 1. ADICIONAR MÚLTIPLOS DOCUMENTOS (Cenário de Pico)
// ---------------------------------------------------------
logHeader("TESTE 1: Inserção de Documentos e Validação de Estado");

printer.addDocument("Relatorio_Financeiro_Anual.pdf", 45);
printer.addDocument("Meme_Gato.jpg", 1);
printer.addDocument("Contrato_Cliente_X.docx", 12);

// Verificações
const status1 = printer.getStatus();
console.log(`\n[Status Atual] ${status1}`);

// Verificando se o primeiro da fila é realmente o primeiro que entrou
const proximo = printer.nextDocument();
console.log(
  `Próximo documento (Espiar): "${proximo.name}" (Esperado: Relatorio_Financeiro_Anual.pdf)`
);

if (
  printer.queueSize() === 3 &&
  proximo.name === "Relatorio_Financeiro_Anual.pdf"
) {
  console.log("✅ SUCESSO: Inserção e ordem inicial corretas.");
} else {
  console.error("❌ ERRO: Falha na inserção ou ordem.");
}

// ---------------------------------------------------------
// 2. VISUALIZAR SEM REMOVER (Peek)
// ---------------------------------------------------------
logHeader("TESTE 2: Método nextDocument() (Peek)");

const peek1 = printer.nextDocument();
console.log(`Espiando 1ª vez: ${peek1.name}`);
const peek2 = printer.nextDocument();
console.log(`Espiando 2ª vez: ${peek2.name}`);

if (peek1 === peek2 && printer.queueSize() === 3) {
  console.log("✅ SUCESSO: nextDocument() não alterou o tamanho da fila.");
} else {
  console.error(
    "❌ ERRO: O documento foi removido ou a fila alterada indevidamente."
  );
}

// ---------------------------------------------------------
// 3. IMPRIMIR NA ORDEM CORRETA (FIFO)
// ---------------------------------------------------------
logHeader("TESTE 3: Execução de Impressão (FIFO)");

// Imprimir o 1º (Relatorio)
const doc1 = printer.printNext();
console.log(`🖨️ IMPRIMINDO: ${doc1.name} (${doc1.pages} pgs)`);

// Verificar se a fila andou
const novoProximo = printer.nextDocument();
console.log(
  `Novo próximo da fila: "${novoProximo.name}" (Esperado: Meme_Gato.jpg)`
);
console.log(`Status após 1ª impressão: ${printer.getStatus()}`);

if (
  doc1.name === "Relatorio_Financeiro_Anual.pdf" &&
  novoProximo.name === "Meme_Gato.jpg"
) {
  console.log("✅ SUCESSO: FIFO respeitado (Head moveu corretamente).");
} else {
  console.error("❌ ERRO: Ordem de impressão incorreta.");
}

// ---------------------------------------------------------
// 4. IMPRESSÃO RESTANTE E CONSISTÊNCIA HEAD/TAIL
// ---------------------------------------------------------
logHeader("TESTE 4: Esvaziando a Fila e Checando Head/Tail");

// Imprimir o 2º (Meme)
printer.printNext();

// Imprimir o 3º (Contrato) - Aqui a fila deve ficar vazia
console.log("Imprimindo o último documento...");
const ultimoDoc = printer.printNext();
console.log(`🖨️ IMPRIMINDO: ${ultimoDoc.name}`);

// Teste Crítico da Lista Encadeada:
// Quando removemos o último, head vira null. O tail TAMBÉM deve virar null.
// Vamos acessar a lista interna diretamente para validar a estrutura de dados.
const listaInterna = printer.queue;

if (
  listaInterna.isEmpty() &&
  listaInterna.getHead() === null &&
  listaInterna.getTail() === null
) {
  console.log("✅ SUCESSO CRÍTICO: Fila vazia. Head e Tail são null.");
} else {
  console.error(
    "❌ ERRO CRÍTICO: Fila vazia, mas Tail ainda aponta para lixo de memória."
  );
  console.log("Head:", listaInterna.getHead());
  console.log("Tail:", listaInterna.getTail());
}

// ---------------------------------------------------------
// 5. TENTAR IMPRIMIR COM FILA VAZIA
// ---------------------------------------------------------
logHeader("TESTE 5: Tratamento de Erro (Underflow)");

const resultadoVazio = printer.printNext();
console.log(`Tentativa de imprimir vazia retornou: "${resultadoVazio}"`);

if (typeof resultadoVazio === "string" && printer.queueSize() === 0) {
  console.log("✅ SUCESSO: Sistema tratou fila vazia sem quebrar.");
} else {
  console.error("❌ ERRO: Comportamento inesperado na fila vazia.");
}

// ---------------------------------------------------------
// 6. LIMPEZA TOTAL (CLEAR) E REINÍCIO
// ---------------------------------------------------------
logHeader("TESTE 6: Limpeza de Emergência (Clear)");

console.log("Adicionando 5 documentos para teste de stress...");
for (let i = 1; i <= 5; i++) {
  printer.addDocument(`Arquivo_Temp_${i}.txt`, 1);
}

console.log(`Tamanho antes do clear: ${printer.queueSize()}`);

// Executa limpeza
printer.clearQueue();

// Validações pós-limpeza
const sizeAfter = printer.queueSize();
const isEmptyList = printer.queue.isEmpty();
const nextDocAfter = printer.nextDocument();

console.log(`Tamanho após clear: ${sizeAfter}`);
console.log(`Lista interna está vazia? ${isEmptyList}`);

if (sizeAfter === 0 && isEmptyList === true && nextDocAfter === null) {
  console.log("✅ SUCESSO: Fila completamente resetada.");
} else {
  console.error("❌ ERRO: Falha ao limpar a fila.");
}

logHeader("FIM DOS TESTES");
