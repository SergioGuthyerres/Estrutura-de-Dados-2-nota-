const ListaDuplaLinkada = require("./listaDuplamenteEncadeada");

module.exports = class ShoppingCartHistory {
  constructor() {
    this.historico = new ListaDuplaLinkada();
    this.posicao = 0;
  }

  addItem(item) {
    // Se o cursor não está no final, apaga o futuro obsoleto
    if (this.posicao < this.historico.len) {
      this.historico.removeFrom(this.posicao);
    }
    //add o novo nó no final do historico
    const novoNo = { type: "add", item };
    this.historico.insert(novoNo);
    this.posicao++; //o ponteiro aumenta
    return novoNo;
  }

  removeItem(itemParaRemover) {
    // 1. Encontrar o último registro do item
    const ultimoRegistroNo = this.historico.findLast((nodePayload) => {
      return nodePayload.item === itemParaRemover;
    });

    const podeRemover = ultimoRegistroNo && ultimoRegistroNo.type !== "remove";
    //se o ultimo registro do item existir e for uma açao diferente de remove,
    // significa que ele ta adicionado na lista e podemos remover
    if (podeRemover) {
      // A lógica de limpar o futuro é IGUAL ao addItem.
      // Se estamos na posição 2, queremos limpar do índice 2 em diante.
      if (this.posicao < this.historico.len) {
        this.historico.removeFrom(this.posicao);
      }
      //add o novo nó no final da lista
      const novoNo = { type: "remove", item: itemParaRemover };
      this.historico.insert(novoNo);
      this.posicao++; //aumenta o ponteiro
      return novoNo;
    }

    return false; //se o item nao existir na lista ou ja tiver sido removido, retorna false
  }

  undo() {
    if (this.posicao > 0) {
      this.posicao--;
      // Retorna o item que acabamos de "desfazer"
      // Nota: Pegamos o elemento no índice que o cursor estava apontando
      return this.historico.getElement(this.posicao);
    }
    return null;
  }

  redo() {
    //verificamos se a posicao ta menor que o tamanho
    if (this.posicao < this.historico.len) {
      const itemParaRefazer = this.historico.getElement(this.posicao); //pegamos o elemento que ta no indice da posicao
      this.posicao++; // Incrementa DEPOIS de pegar o item

      return itemParaRefazer;
    }
    return null; //se ja tiver no final, retorna null
  }

  getCurrentAction() {
    if (this.posicao === 0) return null; //se for o inicio, retorna null (naquela linha do tempo a lista ta vazia)
    return this.historico.getElement(this.posicao - 1); //se nao for, retorna o item referente a posicao atual
  }

  position() {
    return this.posicao; //retorna a posicao atual
  }

  printHistory() {
    //criado para debbugar o codigo, nao interfere no funcionamento do historico
    //se der tempo eu explico
    let atual = this.historico.head;
    let index = 0;
    console.log("\n=== ESTADO DO HISTÓRICO ===");

    if (this.posicao === 0) {
      console.log("   <--- CURSOR (Início/Vazio)");
    }

    while (atual !== null) {
      const acao = atual.item.type.toUpperCase();
      const produto = atual.item.item;
      const texto = `[${index}] ${acao}: ${produto}`;

      if (index + 1 === this.posicao) {
        console.log(`${texto}   <--- CURSOR AQUI`);
      } else {
        console.log(texto);
      }

      atual = atual.next;
      index++;
    }

    console.log(
      `Total de itens: ${this.historico.len} | Posição atual: ${this.posicao}`
    );
    console.log("===========================\n");
  }
};
