const ShoppingCartHistory = require("./solucaoListaDupla")

const histo = new ShoppingCartHistory();

console.log("Testando o carrinho com UNDO e REDO")

//------Registrar operações------//

console.log("Teste 1")
histo.addItem("Arroz")
histo.addItem("Feijão")
histo.removeItem("Suco")

console.log("Tamanho:", histo.historico.len)
console.log("Posição Atual:", histo.position());
console.log("Ação atual:", histo.getCurrentAction().item);

//---------------Desfazer ações------------//

console.log("Teste 2")
histo.undo();
console.log("-Undo 1-")
console.log("Tamanho:", histo.historico.len)
console.log("Posição Atual:", histo.position());
console.log("Ação atual:", histo.getCurrentAction().item);

histo.undo();
console.log("-Undo 2-")
console.log("Tamanho:", histo.historico.len)
console.log("Posição Atual:", histo.position());
console.log("Ação atual:", histo.getCurrentAction().item);

histo.undo();
console.log("-Undo 3-")
console.log("Tamanho:", histo.historico.len)
console.log("Posição Atual:", histo.position());
console.log("Ação atual:", histo.getCurrentAction().item);