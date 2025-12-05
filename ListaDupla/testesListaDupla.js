const ListaDuplaLinkada = require("./listaDuplamenteEncadeada");

//--------------UNDO/REDO-----------------//
class Historico {
    constructor() {
        this.undoStack = new ListaDuplaLinkada();
        this.redoStack = new ListaDuplaLinkada();
    }

    registrar(acao) {
        this.undoStack.insert(acao);
        this.redoStack.clear();

    }
    undo() {
        if(this.undoStack.isEmpty()) {
            console.log("Nada para desfazer")
            return null;
        }
        const acao = this.undoStack.removeEnd();
        this.redoStack.insert(acao);
        return acao;
    }
    redo() {
        if(this.redoStack.isEmpty()) {
            console.log("Nada pra refazer");
            return null;
        }
        const acao = this.redoStack.removeEnd();
        this.undoStack.insert(acao);
        return acao;
    }
    acaoAtual() {
        if(this.undoStack.tail) return this.undoStack.tail.item;
        return null;
    }
}
