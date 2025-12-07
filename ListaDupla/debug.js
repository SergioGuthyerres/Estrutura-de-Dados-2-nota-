const ShoppingCartHistory = require("./solucaoListaDupla");

const hist = new ShoppingCartHistory();

hist.addItem("Arroz");
hist.addItem("Feijão");
hist.addItem("Macarrão");
hist.addItem("Carne");
hist.addItem("Batata");
hist.addItem("Toscana");
hist.undo();
hist.undo();
hist.addItem("Limão");
hist.undo();
hist.undo();
hist.redo();
hist.removeItem("Limão");

hist.printHistory();
