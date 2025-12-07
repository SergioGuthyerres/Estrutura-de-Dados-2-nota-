class Node {
  //criaçao de nó basica, com um next e um previous
  constructor(item) {
    this.item = item;
    this.next = null;
    this.previous = null;
  }
}

module.exports = class ListaDuplaLinkada {
  constructor() {
    //iniciamos a estrutura com uma cabeça(head) e uma cauda(tail), e criamos o length
    this.head = null;
    this.tail = null;
    this.len = 0;
  }
  getNext(node) {
    //metodo que retorna o proximo nó de um nó especifico
    return node.next;
  }
  getPrevious(node) {
    //metodo que retorna no anterior a um nó especifio
    return node.previous;
  }
  isEmpty() {
    //verifica se esta vazia, retorna true ou false
    return this.len === 0;
  }

  insert(item) {
    //criamos o nó
    const newNode = new Node(item);
    if (this.head === null) {
      //verificamos se a lista ta vazia
      this.head = newNode;
      this.tail = newNode;
    } else {
      //se nao estiver vazia, o meu newnode.previous recebe a cauda,
      //a minha cauda.next recebe o novo nó e a cauda passa a ser o novo nó
      // o len aumenta + 1
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
      //verifica vazio(poderia usar o isEmpty tb)
      this.head = newNode;
      this.tail = newNode;
    } else {
      //mesma logica do insert, mas agora o contrario
      //o anterior a cabeça recebe o novoNó, o proximo do novoNó recebe a cabeça
      //  e a cabeça passa a ser o novo nó, aumentamos o len tambem
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.len++;
    return item;
  }
  insertAt(item, index) {
    //verificamos se o index esta dentro do escopo da nossa lista, caso contrario retornamos null
    if (index < 0 || index > this.len) {
      return null;
    }
    let atual = this.head;
    let indice = 0;

    if (index === 0) return this.prepend(item); //se for pra add no inicio, simplismente usamos o prepend
    if (index === this.len) return this.insert(item); //se for pra add no fim, usamos o insert

    while (index !== indice) {
      // se for pra add no meio, precisamos encontrar o nó que esta nesse indice com esse loop:
      atual = atual.next;
      indice += 1;
    }

    const newNode = new Node(item); //agora que sabemos onde esse indice vai entrar (no nó "atual") precisamos:
    newNode.previous = atual.previous; // 1. novoNó previous aponta para o anterior
    newNode.next = atual; // 2. novoNó next aponta para o atual
    atual.previous.next = newNode; // 3. Nó anterior next aponta para o novo nó
    atual.previous = newNode; // 4. Nó atual previous aponta para o novo nó

    this.len++; //aumenta o len
    return item;
  }
  removeEnd() {
    //Remove do final
    if (this.len === 0) {
      //se a lista ta vazia nao tem o que remover
      return null;
    }
    const removido = this.tail.item; //guardamos o valor do item do ultimo para retornar
    if (this.len === 1) {
      //se so tiver 1 item na lista, apenas limparemos os ponteiros
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.previous; //se nao, a cauda vira o nó anterior a cauda
      this.tail.next = null; //e a cauda atual.next (acabamos de atualizar) fica null
    }
    this.len--; // no final de tudo decrementamos o len
    return removido;
  }

  removeFront() {
    if (this.len === 0) {
      //se tiver vazia nao tem o que tirar
      return null;
    }
    const removido = this.head.item; //guardamos o valor para retornar
    if (this.len === 1) {
      // se so tiver 1 item, basta limpar a lista
      this.head = null;
      this.tail = null;
    } else {
      //se nao, o head recebe o next dele, e em seguida limpamos o previous do head
      this.head = this.head.next;
      this.head.previous = null;
    }
    this.len--; //decrementa depois de tudo
    return removido;
  }

  removeIndex(index) {
    //verificamos se o indice existe
    if (index < 0 || index >= this.len) {
      return null;
    }
    let atual = this.head; //guardamos o inicio da fila para percorrer ela no futuro caso seja necessario
    let indice = 0; //indice pra usar no loop while caso seja necessario

    if (index === 0) return this.removeFront(); //se for o primeiro, basta usar o removeFront()
    if (index === this.len - 1) return this.removeEnd(); //se for o ultimo, basta usar o removeEnd()
    while (index !== indice) {
      //precisamos encontrar o index que o usuario colocou,
      // percorremos a lista até que nossa variavel indice fique igual ao index que o usuario colocou
      atual = atual.next;
      indice++;
    }
    //quando achamos o nó que esta no indice que o usuario colocou, atualizamos para que:
    atual.previous.next = atual.next; //o proximo do no anterior ao no encontrado, vira o meu no atual.next
    atual.next.previous = atual.previous; //o anterior do meu proximo do no encontrado, vira o anterior do no atual
    const removido = atual.item; // guardamos o valor removido para retornar
    atual.next = null; //limpamos as ligaçoes dele
    atual.previous = null;
    this.len--; //decrementamos a lista
    return removido;
  }
  remove(item) {
    // remove recebendo o item como parametro
    let index = this.findIndex(item); //para remover recebendo o item, encontramos o indice dele e retornamos o removeIndex
    return this.removeIndex(index);
  }
  removeFrom(index) {
    //remove todos os nos a partir de um indice
    if (index < 0 || index >= this.len) {
      //verifica a existencia do indice
      return null;
    }

    if (index === 0) {
      //se for 0, é só dar um clear
      this.clear();
      return;
    }

    if (index === this.len - 1) {
      //se for o ultimo indice, é so remover do final
      return this.removeEnd();
    }
    //se nao for esses casos, percorreremos a lista (como ja estamos cansados de fazer)
    let atual = this.head;
    let i = 0;
    while (i < index - 1) {
      //note que aqui eu percorro ate encontrar o
      //index do usuario - 1, ou seja, queremos achar o nó anterior ao index
      atual = atual.next;
      i++;
    }

    atual.next = null; //ai a gente corta a ligaçao a partir do no index

    this.tail = atual; //atualiza a cauda
    this.len = index; //atualiza o len que agora é o index
    // e o js cuida do resto (deleta a outra cadeia de nós ligados da memoria com o garbage collection) O algoritmo principal usado pela maioria dos coletores de lixo modernos é o "marcar e varrer" (mark-and-sweep), que começa a partir de um conjunto de objetos raiz (como o objeto global window em navegadores) e marca todos os objetos acessíveis a partir dessas raízes. Qualquer objeto não marcado é considerado inacessível e, portanto, passível de ser coletado. No entanto, esse algoritmo pode falhar em identificar objetos que formam ciclos de referência, onde dois ou mais objetos se referem mutuamente, impedindo que sejam coletados, mesmo que não sejam mais necessários.
  }
  find(comparador) {
    //encontramos um item dentro da lista comparando ele com o parametro
    let atual = this.head; //vamo percorrer dnv, mas note que iniciamos no head

    while (atual !== null) {
      //enquanto nao chegar no final da lista:
      if (comparador(atual.item)) {
        //comparamos o parametro com o atual.item
        return atual.item; //retornamos caso seja o correto
      }
      atual = atual.next; //se nao for, tenta de novo com o proximo
    }
    return null; //se nao achar nada retorna NULL
  }
  findLast(comparador) {
    // mesma coisa só que encontrando a ultima vez que aquele item aparece
    let atual = this.tail;

    while (atual) {
      if (comparador(atual.item)) {
        return atual.item;
      }
      atual = atual.previous;
    }

    return null;
  }

  findIndex(item) {
    //encontra o index de um item
    let atual = this.head;
    let indice = 0;
    while (atual !== null) {
      //percorre até achar
      if (atual.item === item) {
        return indice;
      }
      atual = atual.next;
      indice += 1;
    }
    return -1;
  }
  getElement(index) {
    //retorna o elemento que ta no index
    if (index < 0 || index >= this.len) {
      // verifica se o index existe
      return null;
    }
    let atual;
    //aqui a gente vai otimizar o nosso script um pouquinho porque me cansei de percorrer listas inteiras
    if (index <= this.len / 2) {
      //vamos verificar se o indice ta na primeira metade da lista
      atual = this.head;
      for (let i = 0; i < index; i++) {
        //se for, a gente percorre do head (o caminho é mais curto assim)
        atual = atual.next;
      }
    } else {
      //se nao for, iniciamos da cauda, para achar mais rapido
      atual = this.tail;
      for (let i = this.len - 1; i > index; i--) {
        atual = atual.previous;
      }
    }

    return atual.item;
  }
  clear() {
    //para limpar voltamos para as configuraçoes normais da lista e o garbage collection cuida do resto
    this.head = null;
    this.tail = null;
    this.len = 0;
  }
  size() {
    //retorna o tamanho
    return this.len;
  }

  print() {
    //criei essa funçao para debugg, se der tempo eu explico.
    //ela não é necessaria para o funcionamento da lista
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
    //criei essa funçao para debugg, se der tempo eu explico.
    //ela não é necessaria para o funcionamento da lista
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
