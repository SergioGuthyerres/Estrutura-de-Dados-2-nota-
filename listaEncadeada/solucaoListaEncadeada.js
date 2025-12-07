const LinkedList = require("./listaEncadeada");
class PrintQueue {
  constructor() {
    // A fila é composta internamente pela lista encadeada
    this.queue = new LinkedList();
    this.totalPagesPending = 0; // Controle extra de páginas totais
  }

  addDocument(name, pages) {
    const doc = { name, pages };

    // Na fila de impressão, adicionamos sempre no final (tail)
    this.queue.insert(doc);

    this.totalPagesPending += pages;
    console.log(`[+] Documento "${name}" adicionado à fila.`);
  }

  printNext() {
    if (this.queue.isEmpty()) {
      return "A fila de impressão está vazia. Nada para imprimir.";
    }

    // Removemos do início (head) - FIFO (First In, First Out)
    const nodeRemovido = this.queue.removeFirst();
    const documento = nodeRemovido.item; // Extraímos o dado do nó

    this.totalPagesPending -= documento.pages;
    return documento;
  }

  nextDocument() {
    if (this.queue.isEmpty()) {
      return null;
    }
    // Apenas "espiamos" o início sem remover
    return this.queue.getHead().item;
  }

  queueSize() {
    return this.queue.size();
  }

  clearQueue() {
    // Podemos limpar reiniciando a lista ou removendo um a um.
    // Reiniciar é mais eficiente em JS:
    this.queue = new LinkedList();
    this.totalPagesPending = 0;
    console.log(
      "[!] A fila de impressão foi limpa cancelada pelo administrador."
    );
  }

  // Método extra para mostrar status
  getStatus() {
    return `Docs na fila: ${this.queueSize()} | Total de páginas: ${
      this.totalPagesPending
    }`;
  }
}

module.exports = PrintQueue;
