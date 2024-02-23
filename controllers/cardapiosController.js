/*
// Our fake cardapio:
let cardapio = [{
        id: uuid(),
        itemcardapio: 'Açaí Tradicional',
        nomecategoria: 'Copo Montado',
        descricao: 'Açaí, morango, cobertura, castanha e leite ninho.',
        valor: 'RS6,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Cupuaçu',
        nomecategoria: 'Copo Montado',
        descricao: 'Açaí com cupuaçu, banana, castanha e leite ninho.',
        valor: 'RS7,50'
    },
    {
        id: uuid(),
        itemcardapio: 'Mix Açaí / Cupuaçu',
        nomecategoria: 'Copo Separado',
        descricao: 'Açaí com cupuaçu, banana, cobertura, castanha e leite ninho.',
        valor: 'RS7,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Sorvete no Copo',
        nomecategoria: 'Sorvete no Copo',
        descricao: 'Sorvete de frutas ou ao leite: morango, limão, com coberturas.',
        valor: 'RS4,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Sorvete no Cascão',
        nomecategoria: 'Sorvete no Cascão',
        descricao: 'Sorvete de frutas ou ao leite: morango, limão, com coberturas.',
        valor: 'RS5,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Mix Açaí / Cupuaçu',
        nomecategoria: 'Copo Montado',
        descricao: 'Açaí com cupuaçu, banana, cobertura, castanha e leite ninho.',
        valor: 'RS7,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Açaí Tradicional',
        nomecategoria: 'Copo Separado',
        descricao: 'Açaí com cupuaçu, banana, cobertura, castanha e leite ninho.',
        valor: 'RS6,00'
    },
    {
        id: uuid(),
        itemcardapio: 'Cupuaçu',
        nomecategoria: 'Copo Separado',
        descricao: 'Açaí com cupuaçu, banana, cobertura, castanha e leite ninho.',
        valor: 'RS7,50'
    },
    {
        id: uuid(),
        itemcardapio: 'Sorvete na Casquinha',
        nomecategoria: 'Sorvete na Casquinha',
        descricao: 'Sorvete de frutas ou ao leite: morango, limão, com coberturas.',
        valor: 'RS7,50'
    },
    {
        id: uuid(),
        itemcardapio: 'Sorvete na Cestinha',
        nomecategoria: 'Sorvete na Cestinha',
        descricao: 'Sorvete de frutas ou ao leite: morango, limão, com coberturas.',
        valor: 'RS7,50'
    },
]
*/
//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
const methodOverride = require('method-override');
const { Cardapio } = require('../models');
const { Categoria } = require('../models');
const { Router } = require('express');
const roteador = Router();


roteador.get('/filter', async(req, res) => {
    const cardapios = await Cardapio.findAll();
    //  console.log(cardapios);
    res.render('cardapios/filter', { cardapios });
});


// **********************************
// INDEX - renders multiple cardapios
// **********************************
//retirando o cardapios após a BARRA - antes  '/cardapios' ...  depois '/'
roteador.get('/', async(req, res) => {
    // console.log(Cardapio);
    try {
        const cardapios = await Cardapio.findAll({
            include: [
                { model: Categoria },

            ],
        });
        // produtos aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page
        const countCardapio = await Cardapio.count();
        console.log(countCardapio);

        res.render('cardapios/index', { cardapios, countCardapio });
        // res.status(201).send(cardapios, categorias);
        //res.send(cardapios);

    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os cardápios!!!' + err);
    }
});


// NEW - renders a form cardapios
// **********************************
roteador.get('/new', async(req, res) => {
        const dadosCategoria = await Categoria.findAll({
            order: [
                ['nomecategoria', 'ASC'],
            ],
        });

        res.render('cardapios/new', { dadosCategoria });
    })
    // **********************************
    // CREATE - creates a new cardapios
    // **********************************
roteador.post('/', async(req, res) => {
    const itemcardapio = req.body.itemcardapio;
    const descricao = req.body.descricao;
    const valor = req.body.valor;

    //dados vindos de Models/Migration Categoria
    const categoriasid = req.body.categoriasid;

    await Cardapio.create({
        itemcardapio,
        descricao,
        valor,
        categoriasid
    });
    res.redirect('/cardapios');
});

// *******************************************
// *******************************************
// SHOW - details about one particular cardapios
// *******************************************
roteador.get('/cardapioHomePage', async(req, res) => {
    const cardapios = await Cardapio.findAll({
        include: [
            { model: Categoria },
        ],
        /*order: [
            ['nomecategoria', 'ASC'],
        ]
        */
    });

    res.render('cardapios/cardapioHomePage', { cardapios })
});

roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const cardapios = await Cardapio.findByPk(id, {
        include: [
            { model: Categoria },
        ],

    });

    res.render('cardapios/show', { cardapios })
});

// **********************************

// *******************************************
// EDIT - renders a form to edit a cardapios
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        const { id } = req.params;
        const cardapios = await Cardapio.findByPk(id, {
            include: [
                { model: Categoria }
            ],
        });

        const categoriasproduto = await Categoria.findAll({
            order: [
                ['nomecategoria', 'ASC'],
            ],
            // attributes: ['nomecategoria']
        });
        const categoriasvalue = await Categoria.findByPk(cardapios.categoriasid);

        //console.log(cardapios)
        res.render('cardapios/edit', { cardapios, categoriasvalue, categoriasproduto })
    })
    // *******************************************
    // UPDATE - updates a particular cardapios
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    const { id } = req.params;
    const itemcardapio = req.body.itemcardapio;
    const categoriasid = req.body.nomecategoria;
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    await Cardapio.update({
        itemcardapio,
        descricao,
        valor,
        categoriasid,
    }, {
        where: {
            id: id
        }
    });
    res.redirect('/cardapios')
});

// *******************************************
// DELETE/DESTROY- removes a single cardapios
// *******************************************
roteador.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Cardapio.destroy({
        where: {
            id: id
        }
    });
    //console.log(cardapios);
    res.redirect('/cardapios');
});

module.exports = roteador;