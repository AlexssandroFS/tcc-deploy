/*
// Our fake database:
let produtos = [{
        id: uuid(),

        //dados vem da tabela "Pix"
        
        tipopagto: 'Pix',
           },
    {
        id: uuid(),

         //dados vem da tabela "Dinheiro"
        
        tipopagto: 'Dinheiro',
       
    },
    {
        id: uuid(),

         //dados vem da tabela "formapagto"
        
        tipopagto: 'Cartao Credito',
        

    }
]

*/
//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
const path = require('path');
const methodOverride = require('method-override');
const { Router } = require('express');
const { Formapagto } = require('../models');
const roteador = Router();

// **********************************
// INDEX - renders multiple formapagtos
// **********************************
//retirando o formapagtos após a BARRA - antes  '/formapagtos' ...  depois '/'
roteador.get('/', async(req, res) => {
    //console.log(Formapagto);
    try {
        const formapagtos = await Formapagto.findAll({
            include: [
                // { model: model }
            ]
        }); // formapagtos aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page

        const countFormapagto = await Formapagto.count();
        console.log(countFormapagto);
        res.render('formapagtos/index', { formapagtos, countFormapagto });
        //res.status(201).send(formapagtos);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar as Forma de Pagamento!!!' + err);
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
// NEW - renders a form formapagtos
// **********************************
roteador.get('/new', (req, res) => {
    //  console.log(formapagtos);
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
        res.render('formapagtos/new', { log });
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }
})

// **********************************
// CREATE - creates a new formapagtos
// **********************************
roteador.post('/', async(req, res) => {
    const { formapagto } = req.body;

    const { id } = await Formapagto.create({ formapagto });
    // console.log(tipousuarios);
    res.redirect('/formapagtos');
})


// *******************************************
// *******************************************
// SHOW - details about one particular categorias
// *******************************************
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const formapagtos = await Formapagto.findByPk(id);

    //  console.log(formapagtos);
    res.render('formapagtos/show', { formapagtos })
})


// *******************************************
// EDIT - renders a form to edit a formapagtos
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        //console.log(formapagtos);
        const { id } = req.params;
        const formapagtos = await Formapagto.findByPk(id);
        if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
            res.render('formapagtos/edit', { log, formapagtos});
        } else {
            res.render('../erroAcessoPerfilUsuarios');
         }
    })
    // *******************************************
    // UPDATE - updates a particular formapagtos
    // *******************************************


roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const formapagto = req.body.formapagto;
        await Formapagto.update({
                formapagto
            },

            {
                where: { id: id }
            });
        res.redirect('/formapagtos');
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados da forma de entrega!!!' + err);
    }
});


// *******************************************
// DELETE/DESTROY- removes a single formapagtos
// *******************************************
roteador.delete('/:id', async(req, res) => {
    // console.log(formapagtos);
    const { id } = req.params;
    await Formapagto.destroy({
        where: {
            id: id
        }
    });
    //console.log(categorias);
    res.redirect('/formapagtos');
});

module.exports = roteador;