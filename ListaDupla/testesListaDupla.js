const ShoppingCartHistory = require("./solucaoListaDupla.js");

// Função auxiliar para separar visualmente os testes
function logHeader(titulo) {
  console.log(
    `\n=============================================================`
  );
  console.log(`>>> ${titulo}`);
  console.log(`=============================================================`);
}

const sessao = new ShoppingCartHistory();

console.log(
  "INICIANDO SIMULAÇÃO DE CARRINHO DE COMPRAS COM HISTÓRICO (UNDO/REDO)"
);

// -------------------------------------------------------------------
// CENÁRIO 1: O USUÁRIO ENCHE O CARRINHO (Inserção Sequencial)
// -------------------------------------------------------------------
logHeader("TESTE 1: Registrar Operações (Add/Remove)");

sessao.addItem("Notebook Gamer");
sessao.addItem("Mouse Sem Fio");
sessao.addItem("Teclado Mecânico");

console.log("--> Tentando remover item que não existe ('Cadeira')...");
const removeuInvalido = sessao.removeItem("Cadeira"); // Deve retornar false
console.log(
  `Resultado da remoção inválida: ${
    removeuInvalido ? "Removeu" : "Falhou (Correto)"
  }`
);

console.log("--> Removendo item válido ('Mouse Sem Fio')...");
sessao.removeItem("Mouse Sem Fio");

sessao.printHistory();

// Verificações
if (sessao.historico.len === 4 && sessao.position() === 4) {
  console.log(
    "✅ SUCESSO: Itens adicionados e removidos corretamente. Tamanho: 4."
  );
} else {
  console.error("❌ ERRO: Tamanho ou posição incorretos após inserção.");
}

// -------------------------------------------------------------------
// CENÁRIO 2: O ARREPENDIMENTO (Undo Múltiplo)
// -------------------------------------------------------------------
logHeader("TESTE 2: Desfazer Ações (Undo)");

console.log("Usuário clicou 'Desfazer' 3 vezes...");
console.log(`1. Desfez: ${JSON.stringify(sessao.undo())}`); // Desfaz Remove Mouse
console.log(`2. Desfez: ${JSON.stringify(sessao.undo())}`); // Desfaz Add Teclado
console.log(`3. Desfez: ${JSON.stringify(sessao.undo())}`); // Desfaz Add Mouse

sessao.printHistory();

// O ponteiro deve estar no índice 1 (apenas "Notebook Gamer" ativo)
// Mas a lista ainda deve ter tamanho 4 (os itens futuros ainda existem, só não são atuais)
if (sessao.position() === 1 && sessao.historico.len === 4) {
  console.log("✅ SUCESSO: O ponteiro voltou, mas o futuro foi preservado.");
} else {
  console.error(`❌ ERRO: Posição esperada: 1, Recebida: ${sessao.position()}`);
}

// -------------------------------------------------------------------
// CENÁRIO 3: A INDECISÃO (Redo)
// -------------------------------------------------------------------
logHeader("TESTE 3: Refazer Ações (Redo)");

console.log("Usuário clicou 'Refazer' 2 vezes...");
sessao.redo(); // Refaz Add Mouse
sessao.redo(); // Refaz Add Teclado

console.log(
  `Ação Atual após Redo: ${JSON.stringify(sessao.getCurrentAction())}`
);

// Testando limite do Redo (tenta ir além do final)
console.log("Tentando refazer até o limite e além...");
sessao.redo(); // Refaz Remove Mouse (Chegou no fim)
const redoAlem = sessao.redo(); // Tenta passar do fim

if (redoAlem === null && sessao.position() === sessao.historico.len) {
  console.log("✅ SUCESSO: Redo parou corretamente no final da lista.");
} else {
  console.error("❌ ERRO: Redo ultrapassou o limite da lista.");
}

// -------------------------------------------------------------------
// CENÁRIO 4: REESCREVENDO A HISTÓRIA (Branching/Ramificação)
// Este é o teste mais crítico para Listas Encadeadas em Históricos
// -------------------------------------------------------------------
logHeader("TESTE 4: Executar nova ação após Undo (Substituição de Futuro)");

// Estado Atual: [Add Note, Add Mouse, Add Teclado, Remove Mouse] (Pos 4 de 4)
// Vamos voltar para o estado onde só tinhamos o Notebook
console.log("Voltando para o início (Undo x3)...");
sessao.undo();
sessao.undo();
sessao.undo();
// Agora estamos na Posição 1. O próximo item na lista (histórico "velho") seria "Add Mouse".

console.log("--> USUÁRIO DECIDIU MUDAR DE IDEIA: Adiciona 'Monitor 4K'");
sessao.addItem("Monitor 4K");

// O que deve acontecer:
// 1. A lista do índice 1 para frente (Mouse, Teclado, Remove Mouse) deve ser DESTRUÍDA.
// 2. "Monitor 4K" deve ser o novo índice 2.
// 3. O tamanho total da lista deve cair de 4 para 2.

sessao.printHistory();

if (
  sessao.historico.len === 2 &&
  sessao.getCurrentAction().item === "Monitor 4K"
) {
  console.log(
    "✅ SUCESSO CRÍTICO: Futuro obsoleto removido. Nova linha do tempo criada."
  );
} else {
  console.error(
    "❌ ERRO CRÍTICO: O histórico antigo não foi limpo corretamente."
  );
  console.log(`Tamanho atual: ${sessao.historico.len} (Esperado: 2)`);
}

// Tentar dar Redo agora deve ser impossível (pois estamos no fim da nova linha do tempo)
if (sessao.redo() === null) {
  console.log(
    "✅ SUCESSO: Redo bloqueado corretamente (estamos no novo final)."
  );
}

// -------------------------------------------------------------------
// CENÁRIO 5: MÉTODOS ACESSÓRIOS DA LISTA (Validação Estrutural)
// -------------------------------------------------------------------
logHeader("TESTE 5: Validação da Estrutura de Dados (Interna)");

const lista = sessao.historico;

console.log(`Está vazia? ${lista.isEmpty()}`);
console.log(`Tamanho final: ${lista.size()}`);
console.log(`Head: ${lista.head.item.item} | Tail: ${lista.tail.item.item}`);

// Teste do ClearFrom (usado internamente, mas vamos validar se limpou tudo se voltarmos ao zero)
console.log("\nSimulando 'Novo Jogo' (Voltando ao zero e adicionando item)...");
while (sessao.undo() !== null) {} // Volta tudo
sessao.addItem("Reset Total"); // Isso deve limpar a lista inteira anterior e deixar só esse item

if (lista.size() === 1 && lista.head === lista.tail) {
  console.log("✅ SUCESSO: Lista reiniciada via lógica de histórico.");
} else {
  console.error("❌ ERRO: Falha ao resetar lista.");
}

logHeader("FIM DOS TESTES");
