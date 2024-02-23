/*
// Our fake database:
let categorias = [{
        id: uuid(),
        nomecategoria: 'Picole',
        descricao: 'picole',
    },
    {
        id: uuid(),
        nomecategoria: 'Sorvete',
        descricao: 'sorvete',
    },
    {
        id: uuid(),
        nomecategoria: 'Chocolate',
        descricao: 'barra',
    },
    {
        id: uuid(),
        nomecategoria: 'refrigerante',
        descricao: 'lata pequena',
    },
    {
        id: uuid(),
        nomecategoria: 'bebida',
        descricao: 'alcolica',
    },
    {
        id: uuid(),
        nomecategoria: 'Açaí Copo Médio',
        descricao: 'copo médio',
    },
    {
        id: uuid(),
        nomecategoria: 'Açaí Copo Grande',
        descricao: 'copo Grande'
    }
]
*/

//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
const methodOverride = require('method-override');
const { Categoria, Login, Tipousuario, Usuario } = require('../models');
const { Produto, ProdutoEntrada, Fornecedore } = require('../models');
const path = require('path');
const { Router } = require('express');
const roteador = Router();


roteador.get('/relatoriocategorias', async(req, res) => {
    try {
        const { id } = req.params;

        const categorias = await Categoria.findAll({
            //attributes: { exclude: [id] },
            include: [
                { model: Produto },

            ],

            order: [
                [
                    'nomecategoria', 'ASC',
                ],
            ],
            /*
                        group: [
                            [
                                'nomeprod',
                            ],
                        ],
            */

        });
        const produtosentradas = await ProdutoEntrada.findAll({
            include: [{
                    model: Produto,
                    include: [{
                        model: Categoria,
                        order: [
                            [
                                'nomecategoria', 'ASC',
                            ],
                        ],
                    }, ]
                },
                { model: Fornecedore }
            ],
            group: [
                [
                    'nomeprod', 'categoriasid',
                ],
            ],

        });
        /* const entradas = await ProdutoEntrada.findByPk(id, {
            include: [
                { model: Produto },
                { model: Fornecedore }
            ]
        });
*/
        let vetorCategorias = []
        for (let produto of produtosentradas) {
            let forn = await Categoria.findByPk(produto.Produto.categoriasid);
            vetorCategorias.push(forn.nomecategoria);
        }


        var produto = [{ nomeprod: 'Chocolate Bis Branco', categoria: 'Chocolate' },
            { nomeprod: 'Sorvete Uva', categoria: 'Sorvete' },
            { nomeprod: 'Barra Chocolate', categoria: 'Chocolate' },
            { nomeprod: 'Picole Fruta Uva', categoria: 'Picole' },
            { nomeprod: 'Pacote Copo 300ml descartável', categoria: 'Copo Descartável' }
        ];

        function groupBy(array, prop) {
            var value = array.reduce(function(total, item) {
                var key = item[prop];
                total[key] = (total[key] || []).concat(item);

                return total;
            }, {});

            return value;
        };

        var agrupadosteste = groupBy(produto, 'categoria');
        console.log(agrupadosteste);

        const countRelCat = await ProdutoEntrada.count(produtosentradas.categoriasid);
        //  const countProdEnt = await ProdutoEntrada.count();

        console.log(countRelCat);



        // res.status(201).send(fornecedores);
        res.render('categorias/relatoriocategorias', { categorias, produtosentradas, vetorCategorias, agrupadosteste, countRelCat });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível visualizar o relatório de categorias!!!' + err);
    }

});

// **********************************
// INDEX - renders multiple categorias
// **********************************
//retirando o categorias após a BARRA - antes  '/categorias' ...  depois '/'
roteador.get('/', async(req, res) => {
    //console.log(Categoria);
    try {
        const categorias = await Categoria.findAll({
            include: [
                { model: Produto }
            ]
        }); // categorias aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page

        const countCategoria = await Categoria.count();
        console.log(countCategoria);
        res.render('categorias/index', { categorias, countCategoria });
        //res.status(201).send(formapagtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar as categorias!!!' + err);
    }
});

/*
//Simple search using AND and =

Model.findAll({
  where: {
    attr1: 42,
    attr2: 'cake'
  }
})
WHERE attr1 = 42 AND attr2 = 'cake'
*/

// **********************************
// NEW - renders a form categorias
// **********************************
roteador.get('/new',  async(req, res) => {
        //  console.log(categorias);
        log = await Login.findAll({
            include: [
                { model: Tipousuario },
                { model: Usuario }
            ],
        });
        if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
            res.render('categorias/new', { log });
        } else {
            res.render('categorias/erroAcessoPerfilUsuarios');
        }
        // 1 - Administrador
    // 2-  Supervidor
    // 3 - Atendente
    // 4 - Gerente
    // 5 - Cliente
     })
    // **********************************
    // CREATE - creates a new categorias
    // **********************************
roteador.post('/', async(req, res) => {
    const { nomecategoria, descricao } = req.body;

    const { id } = await Categoria.create({ nomecategoria, descricao });
    // console.log(tipousuarios);
    res.redirect('/categorias');
})

/*
roteador.post('/', async(req, res) => {
    // console.log(categorias);
    const { nomecategoria, descricao } = req.body;
    try {
        const { id } = await Categoria.findOne({
            where: {
                nomecategoria: nomecategoria
            }
        });
        //id = id;

        await Categoria.create({ categorias });
        res.redirect('/categorias');

    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível criar uma Nova Categoria!!!' + err);
    }
})
*/
// *******************************************
// *******************************************
// SHOW - details about one particular categorias
// *******************************************
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const categorias = await Categoria.findByPk(id, {
        include: [{
            model: Produto,

        }],
    });
    //  console.log(categorias);
    res.render('categorias/show', { categorias })
})


// *******************************************
// EDIT - renders a form to edit a Categorias
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        //console.log(categorias);
        const { id } = req.params;
        const categorias = await Categoria.findByPk(id);

        res.render('categorias/edit', { categorias })
    })
    // *******************************************
    // UPDATE - updates a particular categorias
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const nomecategoria = req.body.nomecategoria;
        const descricao = req.body.descricao;
        await Categoria.update({
            nomecategoria,
            descricao
        }, {
            where: {
                id: id
            }
        });
        res.redirect('/categorias')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados da categoria!!!' + err);
    }
});



// *******************************************
// DELETE/DESTROY- removes a single categorias
// *******************************************
roteador.delete('/:id', async(req, res) => {
    // console.log(categorias);
    const { id } = req.params;
    await Categoria.destroy({
        where: {
            id: id
        }
    });
    //console.log(categorias);
    res.redirect('/categorias');
});

module.exports = roteador;