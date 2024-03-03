//const methodOverride = require('method-override');
//importanto o MODEL "Produtos"

const { Despesa, DespesaEntrada, DespesaSaida, Formapagto, sequelize } = require('../models');
const { Router } = require('express');
const roteador = Router();

const { findSourceMap } = require('module');
const { format } = require('path');

const  {Login, Usuario, Tipousuario} = require('../models');
// **********************************
// NEW - renders a form
// **********************************
roteador.get('/caddespesa', async(req, res) => {
    const { id } = req.params;
    try {
        // Verifique qual usuário está enviando o request

        const despesas = await Despesa.findAll({
            order: [
                ['id', 'ASC']
            ],
        });

        const countCadDesp = await Despesa.count();
        res.render('despesas/caddespesa/index', { countCadDesp, despesas });

    } catch (err) { //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar as despesas!!!' + err);
    }
});

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/caddespesa/new', async(req, res) => {

        res.render('despesas/caddespesa/new', { log });
    })

// **********************************
// CREATE - creates a new produtos
// **********************************
roteador.post('/caddespesa', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos
        const nomedespesa = req.body.nomedespesa;

        await Despesa.create({
            nomedespesa
        });

        res.redirect('/despesas/caddespesa', );
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR uma NOVA DESPESA!!!' + err);
    }
});


/*
// SHOW - details about one particular produtos
// *******************************************
roteador.get('/entradas/:id', async(req, res) => {
    const { id } = req.params;
    const despesasentradas = await Despesa.findByPk(id, {

    });
    //const despesa = await Despesa.findAll();
    // const nomedesp = await Despesa.findByPk(despesa.nomedespesa);

    res.render('despesas/caddespesa/show', { despesasentradas })
})

*/
// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/caddespesa/:id/edit', async(req, res) => {
    //console.log(categorias);
    const { id } = req.params;

    const despesas = await Despesa.findByPk(id, {

    });

    res.render('despesas/caddespesa/edit', { despesas })
})


// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/caddespesa/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const nomedespesa = req.body.nomedespesa;

        await Despesa.update({
            nomedespesa
        }, {
            where: {
                id: id,

            }
        });


        res.redirect('/despesas/caddespesa')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR o Nome da despesa!!!' + err);
    }
});


// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/caddespesa/:id', async(req, res) => {
    const { id } = req.params;
    await Despesa.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/despesas/caddespesa');
});

// **********************************
// INDEX - renders multiple Produtos
// **********************************
//retirando o categorias após a BARRA - antes  '/produtos' ...  depois '/'
roteador.get('/entradas', async(req, res) => {
    const { id } = req.params;

    try {
        const despesasentradas = await DespesaEntrada.findAll({
            include: [
                { model: Despesa }
            ],

        });

        let vetorNomeDesp = []
        for (let desp of despesasentradas) {
            let d = await Despesa.findByPk(desp.despesasid);
            vetorNomeDesp.push(d.nomedespesa);
        }

        var array = despesasentradas;
        var somaGeralDespesas = array.reduce((a, b) => a + b.valortotal, 0)
        console.log('Valor TOTAL das Despesas cadastrados no sistema de SAÍDAS: ' + somaGeralDespesas)

        const countDespEntrada = await DespesaEntrada.count();
        console.log(countDespEntrada);
        res.render('despesas/entradas/index', { despesasentradas, vetorNomeDesp, somaGeralDespesas, countDespEntrada });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar as despesas da entrada!!!' + err);
    }
});



// **********************************
// NEW - renders a form
// **********************************
roteador.get('/entradas/new', async(req, res) => {
        const { id } = req.params;

        const despesas = await Despesa.findAll();
        const despesa = await DespesaEntrada.findAll();
        const despesasentradas = await DespesaEntrada.findByPk(id, {
            include: [
                { model: Despesa }
            ]
        });
        const listardespnome = await Despesa.findAll({
            order: [
                ['nomedespesa', 'ASC']
            ]
        });
        if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
            res.render('despesas/entradas/new', {log, despesasentradas, despesa, despesas, listardespnome });
        } else {
            res.render('../erroAcessoPerfilUsuarios');
         }   
    })
    // **********************************
    // CREATE - creates a new produtos
    // **********************************


roteador.post('/entradas', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos
        const descricao = req.body.descricao;
        const nrodocto = req.body.nrodocto;
        const datavalidade = req.body.datavalidade;
        //const statusvalidade = req.body.statusvalidade;
        const valortotal = req.body.valortotal;
        const despesasid = req.body.nomedespesa;
        console.log(descricao, nrodocto, datavalidade, valortotal, despesasid);

        await DespesaEntrada.create({
            descricao,
            nrodocto,
            datavalidade,
            valortotal,
            despesasid
        });
        res.redirect('/despesas/entradas');
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR uma NOVA DESPESA!!!' + err);
    }
});
// *******************************************
// *******************************************
// SHOW - details about one particular produtos
// *******************************************
roteador.get('/entradas/:id', async(req, res) => {
    const { id } = req.params;
    const despesasentradas = await DespesaEntrada.findByPk(id, {
        include: [
            { model: Despesa }
        ],
    });
    //const despesa = await Despesa.findAll();
    // const nomedesp = await Despesa.findByPk(despesa.nomedespesa);
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
        res.render('despesas/entradas/show', {log, despesasentradas });
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }  
})

// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/entradas/:id/edit', async(req, res) => {
    //console.log(categorias);
    const { id } = req.params;
    const despesas = await Despesa.findAll({
        order: [
            ['nomedespesa', 'ASC'],
        ],
    });
    const despesasentradas = await DespesaEntrada.findByPk(id, {
        include: [
            { model: Despesa }
        ],
    });
    const nomedesp = await Despesa.findByPk(despesasentradas.despesasid)
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' ||l.tipousuarioid == '4') {
        res.render('despesas/entradas/edit', {log, despesasentradas, despesas, nomedesp });
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }  
})

// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/entradas/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const descricao = req.body.descricao;
        const nrodocto = req.body.nrodocto;
        const datavalidade = req.body.datavalidade;
        //const statusvalidade = req.body.statusvalidade;
        const valortotal = req.body.valortotal;
        const despesasid = req.body.nomedespesa;

        await DespesaEntrada.update({
            descricao,
            nrodocto,
            datavalidade,
            valortotal,
            despesasid
        }, {
            where: {
                id: id,

            }
        });
        res.redirect('/despesas/entradas')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados da despesa!!!' + err);
    }
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/entradas/:id', async(req, res) => {
    const { id } = req.params;
    await DespesaEntrada.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/despesas/entradas');
});

module.exports = roteador;


/////////////////////////////////////////////////////////////////////////////////////////
//A PARTIR daqui são as configurações para as SAIDAS DE PRODUTOS DO ESTOQUE

roteador.get('/saidas', async(req, res) => {
    try {
        const { id } = req.params;
        //para pegar os dados de ProdutoEntrada
        const despesassaidas = await DespesaSaida.findAll({
            include: [{
                model: DespesaEntrada,
            }, {
                model: Formapagto,
            }],
        });

        //metodo de buscar o nome correto do produto ao listar as saidas
        let vetorNomeDesp = []
        for (let desp of despesassaidas) {
            let nomedesp = await Despesa.findByPk(desp.DespesaEntrada.despesasid);
            vetorNomeDesp.push(nomedesp.nomedespesa);
        }


        //codigo abaixo faz a SOMA TOTAL de TODOS os produtos cadastrados unitariamente no sistema
        var array = despesassaidas;
        var somaGeralDespesas = array.reduce((a, b) => a + b.valortotalsaida, 0)
        console.log('Valor TOTAL das Despesas cadastrados no sistema de SAÍDAS: ' + somaGeralDespesas)


        const countProdDespesa = await DespesaSaida.count();
        console.log(countProdDespesa);
        res.render('despesas/saidas/index', { despesassaidas, vetorNomeDesp, somaGeralDespesas, countProdDespesa });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar a(s) SAÍDA(s) da(s) despesa(s) !!!' + err);
    }
});



// **********************************
// NEW - renders a form
// **********************************
roteador.get('/saidas/new', async(req, res) => {

        const { id } = req.params;
        const despesas = await Despesa.findAll();
        const despesassaidas = await DespesaSaida.findAll();
        const proddesp = await DespesaSaida.findByPk(id, {
            include: [
                { model: DespesaEntrada }
            ],
        });
        //const nomedespesa = await Despesa.findByPk(despesassaidas.despesasidentradas);
        const listarentradas = await DespesaEntrada.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
            //teste -- se usar model PRODUTO aparece a LISTAGEM
            {
                include: [{
                    model: Despesa,
                    order: [
                        ['nomedespesa', 'ASC']
                    ],
                }, ],
                order: [
                    ['id', 'ASC']
                ],
            });
        const formapagtos = await Formapagto.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
            //teste -- se usar model PRODUTO aparece a LISTAGEM
            {
                include: [{
                    model: DespesaSaida,
                    order: [
                        ['formaspagtosid', 'ASC']
                    ],
                }, ],
                order: [
                    ['formapagto', 'ASC']
                ],
            });

            if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '3'|| l.tipousuarioid == '4') {
                res.render('despesas/saidas/new', {log, despesas, despesassaidas, proddesp, listarentradas, formapagtos });
            } else {
                res.render('../erroAcessoPerfilUsuarios');
             }   
    })
    // **********************************
    // CREATE - creates a new produtos
    // **********************************
roteador.post('/saidas', async(req, res) => {
    try { //dados vindos de Models/Migrations Produtos
        const { id } = req.params;

        const datapagto = req.body.datapagto;
        const descricaosaida = req.body.descricaosaida;
        const valortotalsaida = req.body.valortotalsaida;
        const despesasidentradas = req.body.nomedespesa;
        const formaspagtosid = req.body.formapagto;
        console.log(datapagto, descricaosaida, valortotalsaida, despesasidentradas, formaspagtosid);

        await DespesaSaida.create({
            datapagto,
            descricaosaida,
            valortotalsaida,
            despesasidentradas,
            formaspagtosid
        });
        res.redirect('/despesas/saidas');
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível CRIAR uma SAÍDA de DESPESA!!!' + err);
    }
});
// SHOW - details about one particular produtos
// *******************************************
roteador.get('/saidas/:id', async(req, res) => {
    const { id } = req.params;

    const despesassaidas = await DespesaSaida.findByPk(id, {
        include: [
            { model: DespesaEntrada },
            { model: Formapagto },

        ],
    });
    const despesasentradas = await DespesaEntrada.findAll();
    const despesas = await Despesa.findByPk(despesassaidas.despesasidentradas, {
        include: [
            { model: DespesaEntrada },
        ],
    });

    const formapagtos = await Formapagto.findByPk(despesassaidas.formaspagtosid, {
        include: [
            { model: DespesaSaida },
        ],
    });
    //const fornecedores = await Fornecedore.findByPk(produtossaidas.ProdutoEntrada.fornecedoresid);
    res.render('despesas/saidas/show', { despesassaidas, despesasentradas, despesas, formapagtos })
})





// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/saidas/:id/edit', async(req, res) => {
    const { id } = req.params;
    const despesassaidas = await DespesaSaida.findByPk(id, {
        include: [
            { model: DespesaEntrada },
            { model: Formapagto },
        ],
    }); //para mostrar o nome do PRODUTO ATUAL acima da das opções/select de escolha da listagem de produtos
    const despesas = await Despesa.findAll({
        order: [
            ['nomedespesa', 'ASC']
        ],
    });

    const nomedespesa = await DespesaEntrada.findByPk(despesassaidas.despesasidentradas);
    const listarentradas = await DespesaEntrada.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
        {
            include: [{
                model: Despesa,
                order: [
                    ['nomeprod', 'ASC']
                ],
            }, ],
            order: [
                ['id', 'ASC']
            ],
        });

    const nomeformapagto = await Formapagto.findByPk(despesassaidas.formaspagtosid);
    const formapagtos = await Formapagto.findAll( //metodo de buscar o nome correto do produto ao listar as saidas
        //teste -- se usar model PRODUTO aparece a LISTAGEM
        {
            include: [{
                model: DespesaSaida,
                order: [
                    ['formaspagtosid', 'ASC']
                ],
            }, ],
            order: [
                ['formapagto', 'ASC']
            ],
        });
    //const fornecedores = await Fornecedore.findByPk(despesassaidas.DespesaEntrada.fornecedoresid);

    res.render('despesas/saidas/edit', { despesassaidas, despesas, listarentradas, nomedespesa, nomeformapagto, formapagtos })
})

// *******************************************
// UPDATE - updates a particular produtos
// *******************************************
roteador.patch('/saidas/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const datapagto = req.body.datapagto;
        const descricaosaida = req.body.descricaosaida;
        const valortotalsaida = req.body.valortotalsaida;
        const despesasidentradas = req.body.nomedespesa;
        const formaspagtosid = req.body.formapagto;

        console.log('Atributos do campo do req.body: ', datapagto, descricaosaida, valortotalsaida, despesasidentradas, formaspagtosid);

        await DespesaSaida.update({
            datapagto,
            descricaosaida,
            valortotalsaida,
            despesasidentradas,
            formaspagtosid

        }, {
            where: {
                id: id,
            }
        });

        res.redirect('/despesas/saidas')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados da SAÍDA de Despesa!!!' + err);
    }
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/saidas/:id', async(req, res) => {
    const { id } = req.params;
    await DespesaSaida.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/despesas/saidas');
});

////ESTE É PARA O RELATORIO DE ESTOQUE ATUAL E ALERTA DE ESTOQUE ABAIXO DO MINIMO
roteador.get('/totaldespesas', async(req, res) => {

    try {
        const { id } = req.params;
        //para pegar os dados de ProdutoEntrada
        const despesasEntradas = await DespesaEntrada.findAll({});
        const despesasSaidas = await DespesaSaida.findAll({});

        //codigo abaixo faz a SOMA TOTAL de TODOS os produtos cadastrados unitariamente no sistema
        var array = despesasEntradas;
        var somaGeralDespesasEntradas = array.reduce((a, b) => a + b.valortotal, 0)
        console.log('Valor TOTAL das Despesas cadastrados no sistema de ENTRADAS: ' + somaGeralDespesasEntradas)

        //codigo abaixo faz a SOMA TOTAL de TODOS os produtos cadastrados unitariamente no sistema
        var array = despesasSaidas;
        var somaGeralDespesasSaidas = array.reduce((a, b) => a + b.valortotalsaida, 0)
        console.log('Valor TOTAL das Despesas cadastrados no sistema de SAÍDAS: ' + somaGeralDespesasSaidas)

        var saldopendencia = somaGeralDespesasEntradas - somaGeralDespesasSaidas;
        console.log('Valor TOTAL das Despesas = Entradas - Saídas: ' + saldopendencia)

        ////inicio somatório quantidade de produtos cadastrados SAÍDA PROD. ESTOQUE
        const despesassaidas = await DespesaSaida.findAll({
            attributes: [
                [sequelize.col('id'), 'id_saidas'],
                [sequelize.col('despesasidentradas'), 'id_Entradas'],
                [sequelize.col('descricaosaida'), 'desc_saida'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.qtdecompra')), 'total_entradas'],
                //  [sequelize.fn('sum', sequelize.col('qtdsaida')), 'total_saidas'],
                //[sequelize.fn('sum', sequelize.col('ProdutoEntrada.valortotal')), 'Valor_Geral_entradas'],
                [sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('despesasidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançtos_Id_Saidas'],

            ],
            order: ['id'],
            groupBy: ['despesasidentradas'],
            distinct: true,
            raw: true,
        });

        console.log(despesassaidas);

        var valorAtualQtdeSaidas = despesassaidas.map(estoquesaida);

        function estoquesaida(elemento2) {

            return {
                // Id_Saida: elemento2.id_saidas,
                Id_Entrada_na_Saida: elemento2.id_Entradas,
                Qtde_Lançtos_Entradas_na_Saida: elemento2.Qtde_Lançamentos_Id_Entradas_Saidas,
                Descricao_Saidas: elemento2.desc_saida,
                Valor_Total_Saidas: elemento2.Valor_Geral_saidas,
            }

        }

        valorAtualQtdeSaidas.forEach(estoquesaida => {
            console.log(estoquesaida);
            //  console.log("A SAÍDA foi de " + elemento2.Soma_Qtde_Saidas + " unidade(s) de " + elemento2.Nome_Prod + " no BD do estoque. " +
            //    "O Valor Total Atual de Entrada menos a Saída é: R$" + elemento2.ValorEstoqueAtual + ". A Quantidade Total de Produtos Atual, Entadas menos a Saídas é: " + elemento2.QtdeEstoqueAtual);

        })

        const despesasentradas = await DespesaEntrada.findAll({
            include: [
                { model: Despesa }
            ],
            attributes: [
                [sequelize.col('despesasid'), 'id_despesas'],
                [sequelize.col('DespesaEntrada.id'), 'id_entrada_despesas'],
                [sequelize.col('Despesa.nomedespesa'), 'nomedesp'],
                [sequelize.col('descricao'), 'desc_entrada'],
                //  [sequelize.fn('sum', sequelize.col('qtdecompra')), 'total_entradas'],
                //  [sequelize.col('qtdeminima'), 'estoque_minimo'],
                [sequelize.fn('sum', sequelize.col('valortotal')), 'Valor_Geral_entradas'],
                //[sequelize.fn('sum', sequelize.col('valortotalsaida')), 'Valor_Geral_saidas'],

                [sequelize.fn('COUNT', sequelize.col('despesasid')), 'Qtde_Lançtos_Id_Entradas'],

                //[sequelize.fn('COUNT', sequelize.col('produtosidentradas')), 'Qtde_Lançamentos_Id_Entradas_Saidas'],

            ],

            order: ['id'],
            groupBy: ['despesasid'],
            distinct: true,
            raw: true,
        });

        console.log(despesasentradas);


        var valorAtualQtdeEntradas = despesasentradas.map(estoqueentrada);

        function estoqueentrada(elemento2) {
            return {
                Id_Despesa: elemento2.id_despesas,
                Nome_Desp: elemento2.nomedesp,
                Id_Entrada: elemento2.id_entrada_despesas,
                Descricao_Entradas: elemento2.desc_entrada,

                Qtde_Lançtos_na_Entrada: elemento2.Qtde_Lançtos_Id_Entradas,

                //  Valor_Unitario: elemento2.vl_unitario,
                //Soma_Qtde_Entradas: elemento2.total_entradas,
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
        //SELECT DISTINCT pe.id, ps.produtosidentradas, sum(pe.qtdecompra), sum(ps.qtdsaida) FROM produtossaidas as ps, produtosentradas as pe where ps.produtosidentradas = pe.id groupBy by ps.produtosidentradas ORDER BY pe.id;

        res.render('despesas/totaldespesas', {
            despesasEntradas,
            despesasSaidas,
            somaGeralDespesasSaidas,
            somaGeralDespesasEntradas,
            saldopendencia,
            despesasentradas,
            despesassaidas,
            valorAtualQtdeSaidas,
            valorAtualQtdeEntradas
        });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar o Relatório das Despesas: "ENTRADAS - SAÍDAS" ATUAL!!!' + err);
    }
});

//res.status(201).send(produtos);



module.exports = roteador;
