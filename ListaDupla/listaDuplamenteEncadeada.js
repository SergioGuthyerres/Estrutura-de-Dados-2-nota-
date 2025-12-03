class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
    this.previous = null;
  }
}

module.exports = class ListaDuplaLinkada {
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }
  getNext(node) {
    return node.next;
  }
  getPrevious(node) {
    return node.previous;
  }
  isEmpty() {
    return this.len === 0;
  }

  insert(item) {
    //add no final
    const newNode = new Node(item);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
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
      this.head.previous = newNode;
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
    if (index === this.len) return this.insert(item);

    while (index !== indice) {
      atual = atual.next;
      indice += 1;
    }

    const newNode = new Node(item);
    newNode.previous = atual.previous; // 1. Novo nó previous aponta para o anterior
    newNode.next = atual; // 2. Novo nó next aponta para o atual
    atual.previous.next = newNode; // 3. Nó anterior next aponta para o novo nó
    atual.previous = newNode; // 4. Nó atual previous aponta para o novo nó

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
      this.tail = this.tail.previous;
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
      this.head.previous = null;
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

    atual.previous.next = atual.next;
    atual.next.previous = atual.previous;
    const removido = atual.item;
    atual.next = null;
    atual.previous = null;
    this.len--;
    return removido;
  }
  remove(item) {
    let index = this.findIndex(item);
    return this.removeIndex(index);
  }
  removeFrom(index) {
    if (index < 0 || index >= this.len) {
      return null;
    }

    if (index === 0) {
      this.clear();
      return;
    }

    if (index === this.len - 1) {
      return this.removeEnd();
    }

    let atual = this.head;
    let i = 0;
    while (i < index - 1) {
      atual = atual.next;
      i++;
    }

    atual.next = null;

    this.tail = atual;
    this.len = index;
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
  getElement(index) {
    if (index < 0 || index >= this.len) {
      return null;
    }
    let atual;

    if (index <= this.len / 2) {
      atual = this.head;
      for (let i = 0; i < index; i++) {
        atual = atual.next;
      }
    } else {
      atual = this.tail;
      for (let i = this.len - 1; i > index; i--) {
        atual = atual.previous;
      }
    }

    return atual;
  }
  clear() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }
  size() {
    return this.len;
  }

  print() {
    let atual = this.head;
    let resultado = [];

    while (atual !== null) {
      resultado.push(atual.item);
      atual = atual.next;
    }

    console.log(
      "Frente -> Trás: null <-> " + resultado.join(" <-> ") + " <-> null"
    );
  }

  printReverse() {
    let atual = this.tail;
    let resultado = [];

    while (atual !== null) {
      resultado.push(atual.item);
      atual = atual.previous;
    }

    console.log(
      "Trás -> Frente: null <-> " + resultado.join(" <-> ") + " <-> null"
    );
  }
};
