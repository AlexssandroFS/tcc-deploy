/*
// Our fake database:
let produtos = [{
        id: uuid(),

       
        //dados vem da tabela "produtos"
        nomeprod: 'chocolate',
        marca: 'Nestle',
        descricao: 'barra de chocolate',
        datacompra: '15/12/2022',
        datacadastro: '19/12/2022',
        datafabricacao: '01/08/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'quase vencendo',
        volume: '3kg',
        qtdeminima: '2';
        qtdetotal: '10';
        valorunit: '5,00',
        valortotal: '50,00',

        categoriasid: 8,
        fornecedoresid: 1,
      
    },
    {
        id: uuid(),

        //dados vem da tabela "produtos"
       
        nomeprod: 'refrigerante',
        marca: 'Coca-Cola',
        descricao: 'lata Guaraná',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'dentro da validade',
        volume: '300ml',
        qtdeminima: '10';
        qtdetotal: '60';
        valorunit: '2,00',
        valortotal: '120',
        
        categoriasid: 9,
        fornecedoresid: 2,

        },
    {
        id: uuid(),

        //dados vem da tabela "produtos"
        
        nomeprod: 'Copo descartável pequeno',
        marca: 'Descartex',
        descricao: 'pacote 50 copos pequeno açaí',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'Urgente, muito próximo da validade',
        volume: '300ml',
        volume: '300ml',
        qtdeminima: '10';
        qtdetotal: '60';
        valorunit: '2,00',
        valortotal: '120',
        
        categoriasid: 15,
        fornecedoresid: 2,

    }

    {
        id: uuid(),

        //dados vem da tabela "produtos"
        
        nomeprod: 'Balas',
        marca: 'Descartex',
        descricao: 'pacote 50 copos pequeno açaí',
        datacompra: '15/06/2022',
        datacadastro: '19/06/2022',
        datafabricacao: '01/05/2022',
        datavalidade: '31/12/2022',
        statusvalidade: 'Urgente, muito próximo da validade',
        volume: '300ml',
        volume: '300ml',
        qtdeminima: '10';
        qtdetotal: '60';
        valorunit: '2,00',
        valortotal: '120',
        
        categoriasid: 15,
        fornecedoresid: 2,

]
*/
//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
const methodOverride = require('method-override');
//importanto o MODEL "Produtos"
const { Produto, ProdutoSaida, ProdutoEntrada, sequelize } = require('../models');

const { Categoria } = require('../models');
const { Fornecedore } = require('../models');

const { Router } = require('express');
const { findSourceMap } = require('module');
const roteador = Router();

roteador.get('/relatorioprodutos', async(req, res) => {
    try {
        const { id } = req.params;
        const produtos = await Produto.findAll({
            /* include: [
                { model: Categoria }
            ],

             order: [
                [
                    'nomeprod', 'ASC',
                ],
            ],

            group: [
                [
                    'razaosocial',
                ],
            ],
*/

        });
        const fornecedor = await Fornecedore.findAll();

        const produtosentradas = await ProdutoEntrada.findAll({
            include: [
                { model: Produto },
                {
                    model: Fornecedore
                },
            ],
            groupBy: [

                ['nomeprod', 'ASC', ]
            ],

        });

        var produtosent = await ProdutoEntrada.findAll({
            include: [
                { model: Produto },
                {
                    model: Fornecedore
                },
            ],


        });
           //codigo abaixo é para pegar a CATEGORIA do produto
        let vetorCategorias = []
        for (let produto of produtos) {
            let cat = await Categoria.findByPk(produto.categoriasid);
            vetorCategorias.push(cat.nomecategoria);
        }

        // const fornecedores = await Fornecedore.findByPk(produtosentradas.fornecedoresid);

        const countRelProd = await ProdutoEntrada.count();
        console.log(countRelProd);
        // res.status(201).send(fornecedores);
        res.render('produtos/relatorioprodutos', { produtosent, produtos, produtosentradas, fornecedor, vetorCategorias, countRelProd });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível visualizar o relatório de produtos!!!' + err);
    }

});

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/cadprod', async(req, res) => {
    const { id } = req.params;
    try {
        const produtos = await Produto.findAll({
            include: [
                { model: Categoria },
            ],
        });
        const categoria = await Categoria.findByPk(produtos.categoriasid);

        const countCadProd = await Produto.count();
        res.render('produtos/cadprod/index', { countCadProd, produtos, categoria });

    } catch (err) { //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar as categorias!!!' + err);
    }
});

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/cadprod/new', async(req, res) => {
    const { id } = req.params;
    const produtos = await Produto.findByPk(id, {
        include: [
            { model: Categoria }
        ]
    });
    const categoriasprodutos = await Categoria.findAll({
        order: [
            ['nomecategoria', 'ASC'],
        ],
        // attributes: ['razaosocial', 'cnpj', 'nomefantasia']
    });

    // console.log(categoriasproduto);
    //  const countProduto = await Produto.count(qtdeestoque);
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '3' || l.tipousuarioid == '4') {
    res.render('produtos/cadprod/new', {log, produtos, categoriasprodutos });
} else {
    res.render('../erroAcessoPerfilUsuarios');
 }
})

// **********************************
// CREATE - creates a new produtos
// **********************************
roteador.post('/cadprod', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos
        const nomeprod = req.body.nomeprod;
        const qtdeminima = req.body.qtdeminima;
        const categoriasid = req.body.nomecategoria;
        // console.log(nomeprod, qtdeminima);

        await Produto.create({
            nomeprod,
            qtdeminima,
            categoriasid
        });

        res.redirect('/produtos/cadprod', );
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR um NOVO PRODUTO!!!' + err);
    }
});


// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/cadprod/:id/edit', async(req, res) => {
    //console.log(categorias);
    const { id } = req.params;

    const produtos = await Produto.findByPk(id, {
        include: [
            { model: Categoria },
        ]
    });

    const categoriasproduto = await Categoria.findAll({
        order: [
            ['nomecategoria', 'ASC'],
        ],
        // attributes: ['nomecategoria']
    });
    const categoriasvalue = await Categoria.findByPk(produtos.categoriasid);

    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '3' || l.tipousuarioid == '4') {
        res.render('produtos/cadprod/edit', { log, produtos, categoriasproduto, categoriasvalue});
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }
})


// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/cadprod/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const nomeprod = req.body.nomeprod;
        const qtdeminima = req.body.qtdeminima;
        const categoriasid = req.body.nomecategoria;

        //console.log('Atributos do campo do req.body: ', nomeprod, marca, doctofiscal, datacompra, datacadastro, datafabricacao, datavalidade, statusvalidade, qtdecompra,
        //  qtdeminima, qtdeestoque, valorunit, valortotal, categoriasid, fornecedoresid);

        await Produto.update({
            nomeprod,
            qtdeminima,
            categoriasid,
        }, {
            where: {
                id: id,

            }
        });


        res.redirect('/produtos/cadprod')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR o Nome do produto!!!' + err);
    }
});


// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/cadprod/:id', async(req, res) => {
    const { id } = req.params;
    await Despesa.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/produtos/cadprod');
});


// **********************************
// INDEX - renders multiple Produtos
// **********************************
//retirando o categorias após a BARRA - antes  '/produtos' ...  depois '/'
roteador.get('/entradas', async(req, res) => {
    const { id } = req.params;

    try {
        const produtosentradas = await ProdutoEntrada.findAll({
            include: [
                { model: Fornecedore },
                { model: Produto },
            ]
        });

        //const produtos = await Produto.findAll();

        let vetorCategorias = []
        for (let produto of produtosentradas) {
            let cat = await Categoria.findByPk(produto.Produto.categoriasid);
            vetorCategorias.push(cat.nomecategoria);
        }
        const prod = await Produto.findByPk(produtosentradas.produtosid);
        // const fornecedor = await Fornecedore.findByPk(produtosentradas.fornecedoresid);

        //codigo abaixo faz a SOMA TOTAL de TODOS os produtos cadastrados unitariamente no sistema
        var array = produtosentradas;
        var somaGeralProdutos = array.reduce((a, b) => a + b.qtdecompra, 0)
        console.log('TOTAL de produtos cadastrados no sistema de ENTRADAS: ' + somaGeralProdutos)

        const countProdutoEntrada = await ProdutoEntrada.count();
        console.log(countProdutoEntrada);
        res.render('produtos/entradas/index', { prod, produtosentradas, vetorCategorias, somaGeralProdutos, countProdutoEntrada });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os produtos da entrada de estoque!!!' + err);
    }
});



// **********************************
// NEW - renders a form
// **********************************
roteador.get('/entradas/new', async(req, res) => {
        const { id } = req.params;
        const produtos = await Produto.findAll();

        const produto = await ProdutoEntrada.findAll();
        const produtosentradas = await ProdutoEntrada.findByPk(id, {
            include: [
                { model: Produto }
            ]
        });

        const listarprodnome = await Produto.findAll({
            order: [
                ['nomeprod', 'ASC']
            ]
        });
        /* let vetorCategorias = []
         for (let produto of produtosentradas) {
             let cat = await Categoria.findByPk(produto.categoriasid);
             vetorCategorias.push(cat.nomecategoria);
         }
         
         */
        const categoria = await Categoria.findByPk(produto.categoriasid, {
            include: [
                { model: Produto }
            ],
        });

        const dadosfornecedor = await Fornecedore.findAll({
            order: [
                ['razaosocial', 'ASC'],
            ],
            //  attributes: ['nomecategoria']
        });
        if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
            res.render('produtos/entradas/new', { log, produtos, produto, categoria, produtosentradas, listarprodnome, dadosfornecedor });
        } else {
            res.render('../erroAcessoPerfilUsuarios', {log});
         }
    })
    // **********************************
    // CREATE - creates a new produtos
    // **********************************


roteador.post('/entradas', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos

        const marca = req.body.marca;
        const doctofiscal = req.body.doctofiscal;
        const datacompra = req.body.datacompra;
        const datafabricacao = req.body.datafabricacao;
        const datavalidade = req.body.datavalidade;
        const statusvalidade = req.body.statusvalidade;
        const qtdecompra = req.body.qtdecompra;
        //const qtdeestoque = req.body.qtdeestoque;
        const valorunit = req.body.valorunit;
        const valortotal = req.body.valortotal;
        //const statusestoque = req.body.statusestoque;
        const dataatual = req.body.dataatual;


        //dados vindos de Models/Migrations Fornecedor
        const produtosid = req.body.nomeprod;
        const fornecedoresid = req.body.razaosocial;

        console.log(marca, doctofiscal, datacompra, datafabricacao, datavalidade, statusvalidade, qtdecompra, valorunit, valortotal,dataatual, produtosid, fornecedoresid);

        await ProdutoEntrada.create({
            marca,
            doctofiscal,
            datacompra,
            datafabricacao,
            datavalidade,
            statusvalidade,
            qtdecompra,
            valorunit,
            valortotal,
            dataatual, 
            produtosid,
            fornecedoresid
        });
        res.redirect('/produtos/entradas');
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR um NOVO PRODUTO!!!' + err);
    }
});
// *******************************************
// *******************************************
// SHOW - details about one particular produtos
// *******************************************
roteador.get('/entradas/:id', async(req, res) => {
    const { id } = req.params;
    const produtosentradas = await ProdutoEntrada.findByPk(id, {
        include: [
            { model: Produto },
            { model: Fornecedore }
        ],
    });

    /*
        const somaGeralProdEntrada = await ProdutoEntrada.findAll({
            include: [
                //  { model: ProdutoSaida },
                { model: Produto }
            ],
            attributes: [
                [sequelize.col('ProdutoEntrada.id'), 'id_Entradas'],
                [sequelize.col('produtosid'), 'id_produtos'],
                [sequelize.fn('sum', sequelize.col('valortotal')), 'Valor_Geral_entradas'],
            ],
            order: ['id'],
            group: ['produtosid'],
            distinct: true,
            raw: true,
        });

        console.log(somaGeralProdEntrada);


        var valorAtualQtdeEntradas = somaGeralProdEntrada.map(estoqueentrada);

        function estoqueentrada(elemento2) {
            return {
                Id_Produto: elemento2.id_produtos,
                Id_Entrada_na_Saida: elemento2.id_Entradas,
                Valor_Total_Entradas: elemento2.Valor_Geral_entradas.toFixed(2),

            }
        }

        valorAtualQtdeEntradas.forEach(estoqueentrada => {
            console.log(estoqueentrada);
        })



        const somaGeralProdSaida = await ProdutoSaida.findAll({
            include: [
                //  { model: ProdutoSaida },
                { model: ProdutoEntrada }
            ],
            attributes: [
                //[sequelize.col('id'), 'id_saidas'],
                [sequelize.col('produtosidentradas'), 'id_Entradas'],
                [sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_entradas'],
            ],
            order: ['id'],
            group: ['produtosidentradas'],
            distinct: true,
            raw: true,
        });

        console.log(somaGeralProdSaida);

    */
    const categorias = await Categoria.findByPk(produtosentradas.Produto.categoriasid);
    const fornecedores = await Fornecedore.findByPk(produtosentradas.fornecedoresid);
    res.render('produtos/entradas/show', { produtosentradas, categorias, fornecedores })
})

// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/entradas/:id/edit', async(req, res) => {
    //console.log(categorias);
    const { id } = req.params;
   /* try {*/
    const listarprodnome = await Produto.findAll({
        order: [
            ['nomeprod', 'ASC'],
        ],
    });

    const produtos = await ProdutoEntrada.findAll({
        include:[
            {model: Produto}
        ],
    });
   
    const produtosentradas = await ProdutoEntrada.findByPk(id, {
        include: [
            { model: Produto },
            { model: Fornecedore }
        ],
    });

    const categorias = await Categoria.findAll();
    const categoriasNome = await Categoria.findByPk(id);

    /*
    
                let vetorCategorias = []
                for (let produto of produtos) {
                    let cat = await Categoria.findByPk(produto.categoriasid);
                    vetorCategorias.push(cat.nomecategoria);
                }
                */
    const categoriasvalue = await Categoria.findByPk(produtosentradas.Produto.categoriasid);
    const nomeproduto = await Produto.findByPk(produtosentradas.produtosid);

    const dadosfornecedor = await Fornecedore.findAll({
        order: [
            ['razaosocial', 'ASC'],
        ],
        //attributes: ['razaosocial', 'cnpj', 'nomefantasia']
    });
    const fornecedor = await Fornecedore.findByPk(produtosentradas.fornecedoresid);


        ////inicio somatório quantidade de produtos cadastrados SAÍDA PROD. ESTOQUE
        const produtossaidas = await ProdutoSaida.findAll({
            /*  include: [{
                         model: ProdutoEntrada,
                  },

              ],
              */
            attributes: [
                [sequelize.col('id'), 'id_saidas'],
                [sequelize.col('produtosidentradas'), 'id_Entradas'],
                //[sequelize.col('ProdutoEntrada.valorunit'), 'vl_unitario'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.qtdecompra')), 'total_entradas'],
                [sequelize.fn('sum', sequelize.col('qtdsaida')), 'total_saidas'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.valortotal')), 'Valor_Geral_entradas'],
                [sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançtos_Id_Saidas'],

            ],
            order: ['id'],
            group: ['produtosidentradas'],
            distinct: true,
            raw: true,
        });

        console.log(produtossaidas);

        var valorAtualQtdeSaidas = produtossaidas.map(estoquesaida);

        function estoquesaida(elemento2) {

            return {
                Id_Saida: elemento2.id_saidas,
                Id_Entrada_na_Saida: elemento2.id_Entradas,
                Qtde_Lançtos_Entradas_na_Saida: elemento2.Qtde_Lançamentos_Id_Entradas_Saidas,
                Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Saidas: elemento2.Valor_Geral_saidas,
            }

        }

        valorAtualQtdeSaidas.forEach(estoquesaida => {
            console.log(estoquesaida);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })

        const prodentradas = await ProdutoEntrada.findAll({
            include: [
                //  { model: ProdutoSaida },
                { model: Produto }
            ],
            attributes: [
                [sequelize.col('produtosid'), 'id_produtos'],
              //  [sequelize.col('id'), 'id_entradas'],
                [sequelize.col('nomeprod'), 'nomeprod'],
                [sequelize.col('valorunit'), 'vl_unitario'],
                [sequelize.fn('sum', sequelize.col('qtdecompra')), 'total_entradas'],
                [sequelize.col('qtdeminima'), 'estoque_minimo'],
                [sequelize.fn('sum', sequelize.col('valortotal')), 'Valor_Geral_entradas'],
                //[sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosid')), 'Qtde_Lançtos_Id_Entradas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

            ],

            order: ['nomeprod'],
            group: ['produtosid'],
            distinct: true,
            raw: true,
        });

        console.log(prodentradas);


        var valorAtualQtdeEntradas = prodentradas.map(estoqueentrada);

        function estoqueentrada(elemento2) {
            return {
                Id_Produto: elemento2.id_produtos,
                Nome_Prod: elemento2.nomeprod,
             //   Id_Entrada: elemento2.id_Entrada,
                Estoque_Minimo: elemento2.estoque_minimo,

                Qtde_Lançtos_na_Entrada: elemento2.Qtde_Lançtos_Id_Entradas,

                Valor_Unitario: elemento2.vl_unitario,
                Soma_Qtde_Entradas: elemento2.total_entradas,
                // Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Entradas: elemento2.Valor_Geral_entradas,
                //  Valor_Total_Saidas: elemento2.Valor_Geral_saidas,

                // QtdeEstoqueAtual: elemento2.total_entradas - elemento2.total_saidas,
                // ValorEstoqueAtual: (elemento2.Valor_Geral_entradas - elemento2.Valor_Geral_saidas),

            }
        }

        //  var valorAtualEstoqueMinimo = produtosentradas.map(estoqueminimo);
        valorAtualQtdeEntradas.forEach(estoqueentrada => {
            console.log(estoqueentrada);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })
        if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
            res.render('produtos/entradas/edit', {log, valorAtualQtdeEntradas, valorAtualQtdeSaidas, produtos, prodentradas, listarprodnome, produtosentradas, categorias, categoriasNome, nomeproduto, categoriasvalue, dadosfornecedor, fornecedor })
        } else {
            res.render('../erroAcessoPerfilUsuarios');
         }
});

// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/entradas/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const marca = req.body.marca;
        const doctofiscal = req.body.doctofiscal;
        const datacompra = req.body.datacompra;
        const datafabricacao = req.body.datafabricacao;
        const datavalidade = req.body.datavalidade;
        const statusvalidade = req.body.statusvalidade;
        const qtdecompra = req.body.qtdecompra;
        const qtdeestoque = req.body.qtdeestoque;
        const valorunit = req.body.valorunit;
        const valortotal = req.body.valortotal;
        const dataatual = req.body.dataatual;
        const produtosid = req.body.nomeprod;
        const fornecedoresid = req.body.razaosocial;

        console.log('Atributos do campo do req.body: ', marca, doctofiscal, datacompra, datafabricacao, datavalidade, statusvalidade, qtdecompra,
            qtdeestoque, valorunit, valortotal, dataatual, produtosid, fornecedoresid);

        await ProdutoEntrada.update({
            marca,
            doctofiscal,
            datacompra,
            datafabricacao,
            datavalidade,
            statusvalidade,
            qtdecompra,
            qtdeestoque,
            valorunit,
            valortotal,
            dataatual,
            produtosid,
            fornecedoresid

        }, {
            where: {
                id: id,

            }
        });


        res.redirect('/produtos/entradas')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados do produto!!!' + err);
    }
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/entradas/:id', async(req, res) => {
    const { id } = req.params;
    await ProdutoEntrada.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/produtos/entradas');
});

module.exports = roteador;


/////////////////////////////////////////////////////////////////////////////////////////
//A PARTIR daqui são as configurações para as SAIDAS DE PRODUTOS DO ESTOQUE

roteador.get('/saidas', async(req, res) => {
    try {
        const { id } = req.params;



        //para pegar os dados de ProdutoEntrada
        const produtossaidas = await ProdutoSaida.findAll({
            include: [
                { model: ProdutoEntrada },
            ],
        });


        //metodo de buscar o nome correto do produto ao listar as saidas
        let vetorNomeProd = []
        for (let produto of produtossaidas) {
            let nomeproduto = await Produto.findByPk(produto.ProdutoEntrada.produtosid);
            vetorNomeProd.push(nomeproduto.nomeprod);
        }

        /*    let vetorCat = []
        for (let produto of produtossaidas) {
            let categorias = await Categoria.findByPk(produto.categoriasid);
            vetorCat.push(categorias.nomecategoria);
        }
*/
        //codigo abaixo faz a SOMA TOTAL de TODOS os produtos cadastrados unitariamente no sistema
        var array = produtossaidas;
        var somaGeralProdutos = array.reduce((a, b) => a + b.qtdsaida, 0)
        console.log('TOTAL de produtos cadastrados no sistema de SAÍDAS: ' + somaGeralProdutos)


        const countProdSaida = await ProdutoSaida.count();
        console.log(countProdSaida);
        res.render('produtos/saidas/index', { produtossaidas, vetorNomeProd, somaGeralProdutos, countProdSaida });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os produtos para SAÍDA de Estoque!!!' + err);
    }
});



// **********************************
// NEW - renders a form
// **********************************
roteador.get('/saidas/new', async(req, res) => {
        const { id } = req.params;
        //teste -- se usar model PRODUTO aparece a LISTAGEM
        const produtos = await Produto.findAll();
        const produtossaidas = await ProdutoSaida.findAll();
        const prodsaidas = await ProdutoSaida.findByPk(id, {
            include: [
                { model: ProdutoEntrada }
            ],
        });
        //const nomeproduto = await Produto.findByPk(produtossaidas.produtosidentradas);
        const listarentradas = await ProdutoEntrada.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
            {
                include: [{
                    model: Produto,
                    order: [
                        ['nomeprod', 'ASC']
                    ],
                }, ],
                order: [
                    ['id', 'ASC']
                ],

            });
            if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
                res.render('produtos/saidas/new', { log, prodsaidas, produtos, produtossaidas, listarentradas});
            } else {
                res.render('../erroAcessoPerfilUsuarios');
             }
    })
    // SHOW - details about one particular produtos
    // *******************************************
roteador.get('/saidas/:id', async(req, res) => {
    const { id } = req.params;

    const produtossaidas = await ProdutoSaida.findByPk(id, {
        include: [
            { model: ProdutoEntrada },
        ],
    });
    const produtosentradas = await ProdutoEntrada.findAll();
    const produtos = await Produto.findByPk(produtossaidas.ProdutoEntrada.produtosid);

    const fornecedores = await Fornecedore.findByPk(produtossaidas.ProdutoEntrada.fornecedoresid);


    res.render('produtos/saidas/show', { produtossaidas, produtosentradas, produtos, fornecedores })
})


// **********************************
// CREATE - creates a new produtos
// **********************************
roteador.post('/saidas', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos
        const { id } = req.params;

        const qtdsaida = req.body.qtdsaida;
        const valorunitariosaida = req.body.valorunitariosaida;
        const valortotalsaida = req.body.valortotalsaida
        const datasaida = req.body.datasaida;
        const produtosidentradas = req.body.nomeprod;

        console.log(qtdsaida, valortotalsaida, datasaida, produtosidentradas);

        await ProdutoSaida.create({
            qtdsaida,
            valorunitariosaida,
            valortotalsaida,
            datasaida,
            produtosidentradas
        });
        res.redirect('/produtos/saidas');
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR uma SAÍDA de PRODUTO do Estoque!!!' + err);
    }
});


// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/saidas/:id/edit', async(req, res) => {
    const { id } = req.params;
    const produtossaidas = await ProdutoSaida.findByPk(id, {
        include: [
            { model: ProdutoEntrada }
        ],
    }); //para mostrar o nome do PRODUTO ATUAL acima da das opções/select de escolha da listagem de produtos
    const produtos = await Produto.findAll({
        order: [
            ['nomeprod', 'ASC']
        ],
    });

    const nomeproduto = await Produto.findByPk(produtossaidas.produtosidentradas);
    const listarentradas = await ProdutoEntrada.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
        {
            include: [{
                model: Produto,
                order: [
                    ['nomeprod', 'ASC']
                ],
            }, ],
            order: [
                ['id', 'ASC']
            ],
        });
    const fornecedores = await Fornecedore.findByPk(produtossaidas.ProdutoEntrada.fornecedoresid);
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
        res.render('produtos/saidas/edit', { log, produtossaidas, produtos, listarentradas, nomeproduto, fornecedores});
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }
    })

// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/saidas/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const qtdsaida = req.body.qtdsaida;
        const valorunitariosaida = req.body.valorunitariosaida;
        const valortotalsaida = req.body.valortotalsaida
        const datasaida = req.body.datasaida;
        const produtosidentradas = req.body.nomeprod;

        console.log('Atributos do campo do req.body: ', qtdsaida, valorunitariosaida, valortotalsaida, datasaida, produtosidentradas);

        await ProdutoSaida.update({
            qtdsaida,
            valorunitariosaida,
            valortotalsaida,
            datasaida,
            produtosidentradas

        }, {
            where: {
                id: id,
            }
        });

        res.redirect('/produtos/saidas')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados do produto para SAÍDA de Estoque!!!' + err);
    }
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/saidas/:id', async(req, res) => {
    const { id } = req.params;
    await ProdutoSaida.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/produtos/saidas');
});




////ESTE É PARA O RELATORIO DE ESTOQUE ATUAL E ALERTA DE ESTOQUE ABAIXO DO MINIMO
roteador.get('/estoque', async(req, res) => {
    try {
        const { id } = req.params;

        const produtossaidas = await ProdutoSaida.findAll({
            include: [{
                model: ProdutoEntrada,
                include: [{
                    model: Produto
                }],
            }],
            order: ['produtosidentradas'],
            //  group: ['produtosidentradas'],

        });

        let vetorProd = []
        for (let prodsaida of produtossaidas) {
            let prod = await Produto.findByPk(prodsaida.ProdutoEntrada.produtosid);
            vetorProd.push(prod.nomeprod);
        }

        //reduce "ABAIXO" faz a SOMA TOTAL de todos os valores da quantidade de produto 
        //que foi dada entrada no estoque, pega TODOS os ID's, soma ÚNICA. 
        //Ainda não está somando ID individualmente.
        var products = await ProdutoEntrada.findAll({
            include: { model: Produto }
        });

        var array = products;
        var somaGeralProdutosEntradas = array.reduce((a, b) => a + b.qtdecompra, 0)
        console.log(`O TOTAL de produtos cadastrados no sistema de ENTRADAS de Estoque é de: ${somaGeralProdutosEntradas.toFixed(0)}` + ' itens.')


        //o codigo abaixo faz a soma geral de todos os "itens" que está sendo feita a "saída de produtos" do estoque
        var array = produtossaidas;
        var somaGeralProdutosSaidas = array.reduce((a, b) => a + b.qtdsaida, 0)
        console.log(`O TOTAL de produtos cadastrados no sistema de SAÍDAS de Estoque é de: ${somaGeralProdutosSaidas.toFixed(0)}` + ' itens.')



        /*
                const somarqtdsaida = await ProdutoSaida.findAll({
                    attributes: ['id', [sequelize.fn('sum', sequelize.col('qtdsaida')), 'valortotal']],
                    group: ['ProdutoSaida.id'],
                    raw: true,
                    order: sequelize.literal('valortotal DESC')
                });
                console.log(somarqtdsaida);
 


        //Fonte codigo abaixo :  https://blog.betrybe.com/javascript/javascript-filter/
        var produtos = [
            { id: 1, descricao: "Smartphone", categoria: "Eletrônico" },
            { id: 2, descricao: "Notebook", categoria: "Eletrônico" },
            { id: 3, descricao: "Geladeira", categoria: "Eletrodoméstico" },
            { id: 4, descricao: "Liquidificador", categoria: "Eletrodoméstico" },
            { id: 5, descricao: "Fogão", categoria: "Eletrodoméstico" },
            { id: 5, descricao: "Cafeteira", categoria: "Eletrodoméstico" },
            { id: 5, descricao: "Computador", categoria: "Eletrônico" },
            { id: 5, descricao: "Toalha de Banho", categoria: "Cama Mesa Banho" }

        ]

        function retornaEletronico(value) {
            if (value.categoria == "Eletrônico")
                return value;
        }
        var produtosEletronico = produtos.filter(retornaEletronico);
        produtosEletronico.forEach(produtoEletro => {
            console.log(produtoEletro);
        })

       
        Saída:
        { id: 1, descricao: 'Smartphone', categoria: 'Eletrônico' }
        { id: 2, descricao: 'Notebook', categoria: 'Eletrônico' }
        { id: 5, descricao: 'Computador', categoria: 'Eletrônico' }
        */



        //inicio função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD
        /*   var listagemprodutos = [
            { qtdcompra1: 10, item: "Chocolate", qtdesaida1: 5 },
            { qtdcompra1: 10, item: "REFRI", qtdesaida1: 5 },
            { qtdcompra1: 5, item: "Açaí", qtdesaida1: 5 }
        ];

        // var listagemprodutos = produtossaidas;
      
        var valorAtualQtdeEstoque = listagemprodutos.map(subtrairestoque);

        function subtrairestoque(elemento) {
            var estoqueqtdatual = 0;
            return {
                qtdcompra: elemento.qtdcompra1,
                qtdesaida: elemento.qtdesaida1,
                estoqueqtdatual: elemento.qtdcompra1 - elemento.qtdesaida1
            }
        }
        valorAtualQtdeEstoque.forEach(elemento => {
            console.log("A quantidade é de " + elemento.estoqueqtdatual + " para estoque atual.");

        })

*/
        //inicio função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD

        const countSaidas = await ProdutoSaida.count();
        console.log(countSaidas);


        res.render('produtos/estoque', { produtossaidas, vetorProd, somaGeralProdutosSaidas, countSaidas });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar o relatório do Estoque ATUAL!!!' + err);
    }
});


////ESTE É PARA O RELATORIO DE ESTOQUE ATUAL E ALERTA DE ESTOQUE ABAIXO DO MINIMO
roteador.get('/estoquetotal', async(req, res) => {
    const { id } = req.params;

    try {

        ////inicio somatório quantidade de produtos cadastrados SAÍDA PROD. ESTOQUE
        const produtossaidas = await ProdutoSaida.findAll({
            /*  include: [{
                         model: ProdutoEntrada,
                  },

              ],
              */
            attributes: [
                [sequelize.col('id'), 'id_saidas'],
                [sequelize.col('produtosidentradas'), 'id_Entradas'],
                //[sequelize.col('ProdutoEntrada.valorunit'), 'vl_unitario'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.qtdecompra')), 'total_entradas'],
                [sequelize.fn('sum', sequelize.col('qtdsaida')), 'total_saidas'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.valortotal')), 'Valor_Geral_entradas'],
                [sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançtos_Id_Saidas'],

            ],
            order: ['id'],
            group: ['produtosidentradas'],
            distinct: true,
            raw: true,
        });

        console.log(produtossaidas);

        var valorAtualQtdeSaidas = produtossaidas.map(estoquesaida);

        function estoquesaida(elemento2) {

            return {
                Id_Saida: elemento2.id_saidas,
                Id_Entrada_na_Saida: elemento2.id_Entradas,
                Qtde_Lançtos_Entradas_na_Saida: elemento2.Qtde_Lançamentos_Id_Entradas_Saidas,
                Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Saidas: elemento2.Valor_Geral_saidas,
            }

        }

        valorAtualQtdeSaidas.forEach(estoquesaida => {
            console.log(estoquesaida);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })

        const produtosentradas = await ProdutoEntrada.findAll({
            include: [
                //  { model: ProdutoSaida },
                { model: Produto }
            ],
            attributes: [
                [sequelize.col('produtosid'), 'id_produtos'],
                // [sequelize.col('id'), 'id_entradas'],
                [sequelize.col('nomeprod'), 'nomeprod'],
                [sequelize.col('valorunit'), 'vl_unitario'],
                [sequelize.fn('sum', sequelize.col('qtdecompra')), 'total_entradas'],
                // [sequelize.fn(sequelize.col('qtdsaida')), 'total_saidas'],
                [sequelize.fn('sum', sequelize.col('valortotal')), 'Valor_Geral_entradas'],
                //[sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosid')), 'Qtde_Lançtos_Id_Entradas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

            ],
            order: ['id'],
            group: ['produtosid'],
            distinct: true,
            raw: true,
        });

        console.log(produtosentradas);


        var valorAtualQtdeEntradas = produtosentradas.map(estoqueentrada);

        function estoqueentrada(elemento2) {
            return {
                Id_Produto: elemento2.id_produtos,
                Nome_Prod: elemento2.nomeprod,
                // Id_Entrada_Saida: elemento2.id_Entrada,
                //  Id_Saida: elemento2.id_saidas,

                Qtde_Lançtos_na_Entrada: elemento2.Qtde_Lançtos_Id_Entradas,

                Valor_Unitario: elemento2.vl_unitario.toFixed(2),
                Soma_Qtde_Entradas: elemento2.total_entradas,
                // Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Entradas: elemento2.Valor_Geral_entradas.toFixed(2),
                //  Valor_Total_Saidas: elemento2.Valor_Geral_saidas.toFixed(2),

                // QtdeEstoqueAtual: elemento2.total_entradas - elemento2.total_saidas,
                // ValorEstoqueAtual: (elemento2.Valor_Geral_entradas - elemento2.Valor_Geral_saidas),

            }
        }

        valorAtualQtdeEntradas.forEach(estoqueentrada => {
            console.log(estoqueentrada);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })


        //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
        //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);


        //SELECT nomeprod, qtdecompra, (valorunit * qtdecompra) as total FROM produtosentradas as pe, produtos as p WHERE pe.produtosid = p.id and p.nomeprod = 'Bebida Refrigerante Lata Coca Cola';
        //SELECT DISTINCT pe.id, ps.produtosidentradas, sum(pe.qtdecompra), sum(ps.qtdsaida) FROM produtossaidas as ps, produtosentradas as pe where ps.produtosidentradas = pe.id GROUP by ps.produtosidentradas ORDER BY pe.id;

        res.render('produtos/estoquetotal', { produtossaidas, produtosentradas, valorAtualQtdeSaidas, valorAtualQtdeEntradas });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar o relatório do Estoque ATUAL!!!' + err);
    }
});


////ESTE É PARA O RELATORIO DE ESTOQUE ATUAL E ALERTA DE ESTOQUE ABAIXO DO MINIMO
roteador.get('/estoqueminimo', async(req, res) => {
    const { id } = req.params;
    try {

        ////inicio somatório quantidade de produtos cadastrados SAÍDA PROD. ESTOQUE
        const produtossaidas = await ProdutoSaida.findAll({
            /*  include: [{
                         model: ProdutoEntrada,
                  },

              ],
              */
            attributes: [
                [sequelize.col('id'), 'id_saidas'],
                [sequelize.col('produtosidentradas'), 'id_Entradas'],
                //[sequelize.col('ProdutoEntrada.valorunit'), 'vl_unitario'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.qtdecompra')), 'total_entradas'],
                [sequelize.fn('sum', sequelize.col('qtdsaida')), 'total_saidas'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.valortotal')), 'Valor_Geral_entradas'],
                [sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançtos_Id_Saidas'],

            ],
            order: ['id'],
            group: ['produtosidentradas'],
            distinct: true,
            raw: true,
        });

        console.log(produtossaidas);

        var valorAtualQtdeSaidas = produtossaidas.map(estoquesaida);

        function estoquesaida(elemento2) {

            return {
                Id_Saida: elemento2.id_saidas,
                Id_Entrada_na_Saida: elemento2.id_Entradas,
                Qtde_Lançtos_Entradas_na_Saida: elemento2.Qtde_Lançamentos_Id_Entradas_Saidas,
                Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Saidas: elemento2.Valor_Geral_saidas,
            }

        }

        valorAtualQtdeSaidas.forEach(estoquesaida => {
            console.log(estoquesaida);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })

        const produtosentradas = await ProdutoEntrada.findAll({
            include: [
                //  { model: ProdutoSaida },
                { model: Produto }
            ],
            attributes: [
                [sequelize.col('produtosid'), 'id_produtos'],
                // [sequelize.col('id'), 'id_entradas'],
                [sequelize.col('nomeprod'), 'nomeprod'],
                [sequelize.col('valorunit'), 'vl_unitario'],
                [sequelize.fn('sum', sequelize.col('qtdecompra')), 'total_entradas'],
                [sequelize.col('qtdeminima'), 'estoque_minimo'],
                [sequelize.fn('sum', sequelize.col('valortotal')), 'Valor_Geral_entradas'],
                //[sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('produtosid')), 'Qtde_Lançtos_Id_Entradas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

            ],

            order: ['nomeprod'],
            group: ['produtosid'],
            distinct: true,
            raw: true,
        });

        console.log(produtosentradas);


        var valorAtualQtdeEntradas = produtosentradas.map(estoqueentrada);

        function estoqueentrada(elemento2) {
            return {
                Id_Produto: elemento2.id_produtos,
                Nome_Prod: elemento2.nomeprod,
                // Id_Entrada_Saida: elemento2.id_Entrada,
                Estoque_Minimo: elemento2.estoque_minimo,

                Qtde_Lançtos_na_Entrada: elemento2.Qtde_Lançtos_Id_Entradas,

                Valor_Unitario: elemento2.vl_unitario,
                Soma_Qtde_Entradas: elemento2.total_entradas,
                // Soma_Qtde_Saidas: elemento2.total_saidas,
                Valor_Total_Entradas: elemento2.Valor_Geral_entradas,
                //  Valor_Total_Saidas: elemento2.Valor_Geral_saidas,

                // QtdeEstoqueAtual: elemento2.total_entradas - elemento2.total_saidas,
                // ValorEstoqueAtual: (elemento2.Valor_Geral_entradas - elemento2.Valor_Geral_saidas),

            }
        }

        //  var valorAtualEstoqueMinimo = produtosentradas.map(estoqueminimo);
        valorAtualQtdeEntradas.forEach(estoqueentrada => {
            console.log(estoqueentrada);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })

        //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
        //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);



        //SELECT nomeprod, qtdecompra, (valorunit * qtdecompra) as total FROM produtosentradas as pe, produtos as p WHERE pe.produtosid = p.id and p.nomeprod = 'Bebida Refrigerante Lata Coca Cola';
        //SELECT DISTINCT pe.id, ps.produtosidentradas, sum(pe.qtdecompra), sum(ps.qtdsaida) FROM produtossaidas as ps, produtosentradas as pe where ps.produtosidentradas = pe.id GROUP by ps.produtosidentradas ORDER BY pe.id;

        res.render('produtos/estoqueminimo', {
            produtosentradas,
            produtossaidas,
            valorAtualQtdeSaidas,
            valorAtualQtdeEntradas
        });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar o relatório do Estoque Mínimo ATUAL!!!' + err);
    }
});
module.exports = roteador;