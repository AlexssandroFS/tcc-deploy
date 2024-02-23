//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
/*
// Our fake database:
let produtos = [{
        id: uuid(),

        //dados vem da tabela "produtos"
        nomeprod: 'chocolate',
        marca: 'Nestle',
        categoria: 'chocolate',
        descricao: 'barra de chocolate',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'quase vencendo',
        volume: '1kg',
        valor: '15,00',
        quantidade: '5',
        total: '75,00',

        //dados vem da tabela "fornecedores"
        razaosocialfornecedor: 'Palucia',
        nomefantasiafornecedor: 'balas & doces Palucia',
        cnpjfornecedor: '11.111.111/1111-11',

         //dados vem da tabela "contatos"
        telefonefornecedor: '222222222222'
    },
    {
        id: uuid(),

        //dados vem da tabela "produtos"
       
        nomeprod: 'refrigerante',
        marca: 'Coca-Cola',
        categoria: 'refrigerante',
        descricao: 'lata Guaraná',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'dentro da validade',
        volume: '300ml',
        valor: '3,00',
        quantidade: '20',
        total: '60,00',

         //dados vem da tabela "fornecedores"
        razaosocialfornecedor: 'Palucia',
        nomefantasiafornecedor: 'balas & doces Palucia',
        cnpjfornecedor: '11.111.111/1111-11',

        //dados vem da tabela "contatos"
        telefonefornecedor: '222222222222'
    },
    {
        id: uuid(),

        //dados vem da tabela "produtos"
        
        nomeprod: 'copo descartável',
        marca: 'Descartex',
        categoria: 'copo',
        descricao: 'pacote 50 copos pequeno açaí',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'Urgente, muito próximo da validade',
        volume: '300ml',
        valor: '2,00',
        quantidade: '5',
        total: '10,00',

        //dados vem da tabela "fornecedores"
        razaosocialfornecedor: 'Maribeu',
        nomefantasiafornecedor: 'Maribeu descartáveis',
        cnpjfornecedor: '11.111.111/1111-11',

        //dados vem da tabela "contatos"
        telefonefornecedor: '222222222222'

    }
]
*/

//importanto o MODEL "Produtos"
const { Produto } = require('../models');
const { Categoria } = require('../models');
const { Fornecedor } = require('../models');
const { Usuario } = require('../models');
const { Formapagto } = require('../models');
const { Entrega } = require('../models');

const { Router } = require('express');
const { Pedido } = require('../models');
const roteador = Router();

// **********************************
// INDEX - renders multiple pedidos
// **********************************
//retirando o categorias após a BARRA - antes  '/pedidos' ...  depois '/'
roteador.get('/', async(req, res) => {

    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: Categoria },
                { model: Produto },
                { model: Fornecedor },
                { model: Usuario },
                { model: Formapagto },
                { model: Entrega }

            ]
        });
        res.render('pedidos', { pedidos });
        //return res.status(200).json(pedidos);
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível listar os pedidos!!!' + err);
    }
});


// **********************************
// NEW - renders a form
// **********************************
roteador.get('/new', async(req, res) => {
        const { id } = req.params;
        const dadosformapagto = await Formapagto.findAll({
            order: [
                ['formapagto', 'ASC'],
            ],
            // attributes: ['razaosocial', 'cnpj', 'nomefantasia']
        });

        const categoriasprodutos = await Categoria.findAll({
            order: [
                ['nomecategoria', 'ASC'],
            ],
            //  attributes: ['nomecategoria']
        });
        // console.log(categoriasproduto);
        //  const countProduto = await Produto.count(qtdeestoque);
        res.render('pedidos/new', { dadosformapagto });
    })
    // **********************************
    // CREATE - creates a new pedidos
    // **********************************
roteador.post('/', async(req, res) => {
    const qtde = req.body.qtde;
    const valorunit = req.body.valorunit;
    const totalparcial = req.body.totalparcial;
    const desconto = req.body.desconto;
    const valorfinal = req.body.valorfinal;
    const datapedido = req.body.datapedido;

    await Pedido.create({
        qtde,
        valorunit,
        totalparcial,
        desconto,
        valorfinal,
        datapedido
    });
    // console.log(pedidos);
    res.redirect('/pedidos');
})



// *******************************************
// *******************************************
// SHOW - details about one particular pedidos
// *******************************************
//roteador.get('/pedidos/:id', (req, res) => {
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const pedidos = await Pedido.findByPk(id);
    //  console.log(pedidos);
    res.render('pedidos/show', { pedidos })
})

// *******************************************
// EDIT - renders a form to edit a pedidos
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        const { id } = req.params;
        let qtde = await Pedido.findByPk(id);
        let valorunit = await Pedido.findByPk(id);
        let totalparcial = await Pedido.findByPk(id);
        let desconto = await Pedido.findByPk(id);
        let valorfinal = await Pedido.findByPk(id);
        let datapedido = await Pedido.findByPk(id);
        res.render('pedidos/edit', { pedidos })
    })
    // *******************************************
    // UPDATE - updates a particular pedidos
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    const qtde = req.body.nomeprod;
    const valorunit = req.body.marca;
    const totalparcial = req.body.categoria;
    const desconto = req.body.descricao;
    const valorfinal = req.body.valorfinal;
    const datapedido = req.body.datapedido;

    await Pedido.create({
        qtde,
        valorunit,
        totalparcial,
        desconto,
        valorfinal,
        datapedido
    }, {
        where: {
            id: id
        }
    });
    res.redirect('/pedidos')
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Pedido.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/pedidos');
});

module.exports = roteador;