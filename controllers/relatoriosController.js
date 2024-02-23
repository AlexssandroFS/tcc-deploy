//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
//importanto os MODELS 
const { Router } = require('express');
const roteador = Router();
const { Produto, Fornecedor, Categoria } = require('express');


/*
roteador.get('/relatorioprodutos', async(req, res) => {
    const { id } = req.params;
    try {
        produtos = await Produto.findAll({
            include: [
                { model: Fornecedor },
                { model: Categoria }
            ],
            order: [
                ['doctofiscal', 'DESC'],
            ],
            group: [
                ['nomeprod'],
            ],

            //só qdo tira o "id" das opções de attributes é quea pesquisa fica em ordem DESC
            attributes: ['id', 'doctofiscal', 'nomeprod', 'qtdeminima', 'statusestoque'],
            // where: { doctofiscal == fornecedoresid }

        }); // produtos aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page



        let vetorFornecedor = []
        for (let produto of produtos) {
            let fornecedor = await Fornecedor.findByPk(produto.fornecedoresid);
            vetorFornecedor.push(fornecedor.cnpj);
        }


        const fornecedor = await Fornecedor.findByPk(produtos.fornecedoresid);
        const countProduto = await Produto.count();
        console.log(countProduto);
        res.render('relatorios/relatorioprodutos', { produtos, fornecedor, countProduto });
        //res.status(201).send(produtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os produtos!!!' + err);
    }
});
*/

/*
// **********************************
// INDEX - renders multiple usuarios
// **********************************
//retirando o usuarios após a BARRA - antes  '/usuarios' ...  depois '/'
roteador.get('/realtorioprodutos', async(req, res) => {
    try {
        const { id } = req.params;
        let filter = {};
        if (req.query.notafiscal) {
            filter = { relatorios: req.query.notafiscal.split(',') }
        }
        const fornecedorNF = await Produto.findAll(filter, {
            include: [
                { model: Produtos },
                { model: Fornecedor }
            ]
        }).populate('produtos');
        //res.status(201).send(fornecedorNF);
        res.render('relatorios/realtorioprodutos', { fornecedorNF });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os usuarios!!!' + err);
    }

});
*/

module.exports = roteador;