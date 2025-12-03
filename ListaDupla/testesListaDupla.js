const ListaDuplaLinkada = require("./listaDuplamenteEncadeada");

// --- ÁREA DE TESTES ---

const lista = new ListaDuplaLinkada();

console.log("1. Inserindo A, B, C, D, E");
lista.insert("A");
lista.insert("B");
lista.insert("C");
lista.insert("D");
lista.insert("E");

lista.print();
// Esperado: null <-> A <-> B <-> C <-> D <-> E <-> null
lista.printReverse();
// Esperado: null <-> E <-> D <-> C <-> B <-> A <-> null

console.log("\n2. Testando removeFrom(2) - Cortar a partir do índice 2 (C)");
// Lembrando: Índices são 0(A), 1(B), 2(C), 3(D), 4(E).
// Se remover do 2 em diante, devem sobrar A e B.

// Certifique-se de ter atualizado o método removeFrom com a correção que passei antes!
lista.removeFrom(2);

lista.print();
// Esperado: null <-> A <-> B <-> null

lista.printReverse();
// Esperado: null <-> B <-> A <-> null

console.log("\n3. Verificando integridade");
console.log("Tamanho (len):", lista.size()); // Esperado: 2
console.log("Tail atual:", lista.tail.item); // Esperado: B
console.log("Head atual:", lista.head.item); // Esperado: A
