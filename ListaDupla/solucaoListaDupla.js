const ListaDuplaLinkada = require("./listaDuplamenteEncadeada");

class ShoppingCartHistory {
  constructor() {
    const historico = new ListaDuplaLinkada();
    this.historico = historico;
    this.posicao = 0;
  }
  addItem(item) {
    if (this.posicao < this.historico.len) {
      this.historico.removeFrom(this.posicao + 1);
    }
    this.posicao++;
    return this.historico.insertAt({ type: "add", item }, this.posicao);
  }
  removeItem(item) {
    if (this.posicao < this.historico.len) {
      this.historico.removeFrom(this.posicao + 1);
    }
    this.posicao++;
    return this.historico.insertAt({ type: "remove", item },this.posicao);
  }
  undo() {
    if(this.posicao > 0) {
      this.posicao--;
      return this.historico.getElement(this.posicao);
    }
  }
  redo() {
    if (this.posicao < this.historico.len - 1) {
      this.posicao++;
      return this.historico.getElement(this.posicao);
    }
    return "ja esta no final do historico";
  }
  getCurrentAction() {
    return this.historico.getElement(this.posicao);
  }
  position() {
    return this.posicao;
  }
}
