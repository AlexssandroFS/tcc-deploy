//inserido por causa do controllers
cardapiosController = require('./cardapiosController');
categoriasController = require('./categoriasController');
fornecedoresController = require('./fornecedoresController');
galeriapedidosController = require('./galeriapedidosController');
loginController = require('./loginController');
produtosController = require('./produtosController');
usuariosController = require('./usuariosController');
formapagtosController = require('./formapagtosController');
tipousuariosController = require('./tipousuariosController');
despesasController = require('./despesasController');
pedidosController = require('./pedidosController');

controller = {
    //formato de objeto de js no json
    cardapios: cardapiosController,
    categorias: categoriasController,
    fornecedores: fornecedoresController,
    login: loginController,
    produtos: produtosController,
    produtosentradas: produtosController,
    produtossaidas: produtosController,
    despesas: despesasController,
    despesasentradas: despesasController,
    despesassaidas: despesasController,
    usuarios: usuariosController,
    formapagtos: formapagtosController,
    tipousuarios: tipousuariosController,
    galeriapedidos: galeriapedidosController,
    pedidos: pedidosController,
}
module.exports = controller;    



