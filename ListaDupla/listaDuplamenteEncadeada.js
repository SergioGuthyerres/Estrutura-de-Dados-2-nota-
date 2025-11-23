class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
  }
}

module.exports = class ListaDuplaLinkada {
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  isEmpty() {
    return this.len === 0;
  }

  append(item) {
    //add no final
    const newNode = new Node(item);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.len++;
    return item;
  }
  prepend(item) {
    // add no inicio
    const newNode = new Node(item);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.len++;
    return item;
  }
  insertAt(item, index) {
    if (index < 0 || index > this.len) {
      return null;
    }
    let atual = this.head;
    let indice = 0;

    if (index === 0) return this.prepend(item);
    if (index === this.len) return this.append(item);

    while (index !== indice) {
      atual = atual.next;
      indice += 1;
    }

    const newNode = new Node(item);
    newNode.prev = atual.prev; // 1. Novo nó prev aponta para o anterior
    newNode.next = atual; // 2. Novo nó next aponta para o atual
    atual.prev.next = newNode; // 3. Nó anterior next aponta para o novo nó
    atual.prev = newNode; // 4. Nó atual prev aponta para o novo nó

    this.len++;
    return item;
  }
  removeEnd() {
    if (this.len === 0) {
      return null;
    }
    const removido = this.tail.item;
    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.len--; // princípio DRY
    return removido;
  }

  removeFront() {
    if (this.len === 0) {
      return null;
    }
    const removido = this.head.item;
    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.len--;
    return removido;
  }

  removeIndex(index) {
    if (index < 0 || index >= this.len) {
      return null;
    }
    let atual = this.head;
    let indice = 0;

    if (index === 0) return this.removeFront();
    if (index === this.len - 1) return this.removeEnd();
    while (index !== indice) {
      atual = atual.next;
      indice++;
    }

    atual.prev.next = atual.next;
    atual.next.prev = atual.prev;
    const removido = atual.item;
    atual.next = null;
    atual.prev = null;
    this.len--;
    return removido;
  }

  find(item) {
    let atual = this.head;
    while (atual !== null) {
      if (atual.item === item) {
        return atual;
      }
      atual = atual.next;
    }
    return null;
  }

  findIndex(item) {
    let atual = this.head;
    let indice = 0;
    while (atual !== null) {
      if (atual.item === item) {
        return indice;
      }
      atual = atual.next;
      indice += 1;
    }
    return -1;
  }
  clear() {
    this.head = null;
    this.tail = null;
    this.tail = null;
  }
  size() {
    return this.len;
  }
};
