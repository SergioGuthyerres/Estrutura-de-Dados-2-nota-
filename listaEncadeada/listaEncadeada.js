class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

// Função de comparação padrão
function defaultEquals(a, b) {
  return a === b;
}

module.exports = class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = null;
    this.tail = null; // Mantém referência do último item
  }

  insert(element) {
    const node = new Node(element);

    if (this.head == null) {
      this.head = node;
      this.tail = node; // Se só tem 1, ele é head e tail
    } else {
      // Otimização: usa o tail para adicionar direto no fim sem loop
      this.tail.next = node;
      this.tail = node; // Atualiza o tail para o novo último
    }
    this.count++;
  }

  insertAt(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      if (index === 0) {
        // Inserir no começo
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head = node;
        }
      } else if (index === this.count) {
        // Inserir no final (atalho)
        this.tail.next = node;
        this.tail = node;
      } else {
        // Inserir no meio
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  removeFirst() {
    if (this.head === null) return undefined;

    const removido = this.head;
    this.head = this.head.next;
    this.count--;

    // Se a lista ficou vazia, precisamos zerar o tail também
    if (this.count === 0) {
      this.tail = null;
    }

    return removido;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.item)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }
  peek() {
    return this.getHead();
  }
};
