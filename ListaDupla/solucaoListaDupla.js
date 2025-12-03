const ListaDuplaLinkada = require("./listaDuplamenteEncadeada");

class ShoppingCartHistory {
  constructor() {
    const historico = new ListaDuplaLinkada();
    this.historico = historico;
    this.posicao = 0;
  }
  addItem(item) {
    if (posicao < this.historico.len) {
      this.historico.removeFrom(posicao + 1);
    }
    this.posicao++;
    return this.historico.insert({ type: "add", item });
  }
  removeItem(item) {
    if (posicao < this.historico.len) {
      this.historico.removeFrom(posicao + 1);
    }
    this.posicao++;
    return this.historico.insert({ type: "remove", item });
  }
  undo() {
    return this.posicao--;
  }
  redo() {
    if (this.posicao < this.historico.len) {
      return this.posicao++;
    }
    return "ja esta no final do historico";
  }
  getCurrentAction() {
    let atual = this.historico.getElement(this.posicao);
  }
  position() {
    return this.posicao;
  }
}
