//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's

//importanto o MODEL "Produtos"
const { Pedido } = require('../models');
const { Usuario } = require('../models');

const { Router } = require('express');
const roteador = Router();

/*
// Our fake database:
let produtos = [{
        id: uuid(),

        //dados vem da tabela "entrega"
        
        dataentrega: '14/06/2022',
        valorentrega: '50,00',
        tempoentrega: '15min',
        formaentrega: 'Motoboy',
    },
    {
        id: uuid(),

         //dados vem da tabela "entrega"
        
        dataentrega: '15/06/2022',
        valorentrega: '35,00',
        tempoentrega: '15min',
        formaentrega: 'Motoboy',
    },
    {
        id: uuid(),

         //dados vem da tabela "entrega"
        
        dataentrega: '16/06/2022',
        valorentrega: '15,00',
        tempoentrega: '15min',
        formaentrega: 'Motoboy',

    }
]
*/

// **********************************
// INDEX - renders multiple Entregas
// **********************************
//retirando o categorias após a BARRA - antes  '/Entregas' ...  depois '/'
roteador.get('/', async(req, res) => {

    try {
        entregas = await Entrega.findAll({
            include: [
                // { model: model }
            ]
        }); // entregas aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page
        res.render('entregas/index', { entregas });
        // return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ err });
    }
});

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/new', (req, res) => {
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
        res.render('entregas/new', { log });
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }    
    })
    // **********************************
    // CREATE - creates a new entregas
    // **********************************
roteador.post('/', async(req, res) => {
        const qtde = req.body.qtde;
        const valorunit = req.body.valorunit;
        const totalparcial = req.body.totalparcial;
        const desconto = req.body.desconto;
        const valorfinal = req.body.valorfinal;

        await Entrega.create({
            qtde,
            valorunit,
            totalparcial,
            desconto,
            valorfinal
        });
        console.log(entregas);
        res.redirect('/entregas');
    })
    // *******************************************
    // *******************************************
    // SHOW - details about one particular entregas
    // *******************************************
    //roteador.get('/fornecedores/:id', (req, res) => {
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const entregas = await Entrega.findByPk(id);
    //  console.log(entregas);
    res.render('entregas/show', { entregas })
})

// *******************************************
// EDIT - renders a form to edit a Entregas
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        const { id } = req.params;
        let qtde = await Entrega.findByPk(id);
        let valorunit = await Entrega.findByPk(id);
        let totalparcial = await Entrega.findByPk(id);
        let desconto = await Entrega.findByPk(id);
        let valorfinal = await Entrega.findByPk(id);

        res.render('entregas/edit', { entregas })
    })
    // *******************************************
    // UPDATE - updates a particular pedentregasidos
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const qtde = req.body.qtde;
        const valorunit = req.body.valorunit;
        const totalparcial = req.body.totalparcial;
        const desconto = req.body.desconto;
        const valorfinal = req.body.valorfinal;
        await Entrega.update({
            qtde,
            valorunit,
            totalparcial,
            desconto,
            valorfinal
        }, {
            where: {
                id: id
            }
        });
        res.redirect('/entregas')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados da formade entrega!!!' + err);
    }
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Entrega.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/entregas');
});

module.exports = roteador;