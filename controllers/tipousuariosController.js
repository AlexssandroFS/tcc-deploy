//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's

/*
// Our fake database:
let produtos = [{
        id: uuid(),

        tipousuario: 'Administrador',
           },
    {
        id: uuid(),
        
        tipousuario: 'Supervisor',
       
    },
    {
        id: uuid(),
        
        tipousuario: 'Atendente',
        

    },
    {
        id: uuid(),
        
        tipousuario: 'Cliente',
        

    }
]
*/
//importanto o MODEL "Produtos"
const { Tipousuario } = require('../models');
const { Login } = require('../models');
const { Router } = require('express');
const roteador = Router();

// **********************************
// INDEX - renders multiple Entregas
// **********************************
//retirando o categorias após a BARRA - antes  '/Entregas' ...  depois '/'
roteador.get('/', async(req, res) => {
    const { id } = req.params;

    //console.log(Tipousuario);
    try {
        const perfil = await Tipousuario.findAll({
            include: [
                { model: Login }
            ],
            distinct: true,
            group: ["id"],
        }); // usuarios aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page
        const countTipoUsuario = await Tipousuario.count();
        console.log(countTipoUsuario); {
            where: { id: id }
        }
        res.render('tipousuarios/index', { perfil, countTipoUsuario });
        //  res.status(201).send(tipousuarios);
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível acessar a tela tipo de usuarios!!!' + err);
    }
})

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/new', (req, res) => {
    if (l.tipousuarioid == '1' ) {
        res.render('tipousuarios/new', {log});
    } else {
        res.render('../erroAcessoPerfilUsuarios');
     }
    })
    // **********************************
    // CREATE - creates a new tipousuario
    // **********************************

roteador.post('/', async(req, res) => {
    const { id } = req.params;
    const { tipousuario, statusperfil } = req.body;
    await Tipousuario.create({
        tipousuario,
        statusperfil
    });
    // console.log(tipousuarios);
    res.redirect('/tipousuarios');
})

// *******************************************
// *******************************************
// SHOW - details about one particular tipousuarios
// *******************************************
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const tipousuarios = await Tipousuario.findByPk(id);

    //  console.log(categorias);
    res.render('tipousuarios/show', { tipousuarios })
})


// *******************************************
// EDIT - renders a form to edit a tipousuarios
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        //console.log(tipousuarios);
        const { id } = req.params;
        const tipousuarios = await Tipousuario.findByPk(id);
        if (l.tipousuarioid == '1' ) {
            res.render('tipousuarios/edit', {log, tipousuarios});
        } else {
            res.render('../erroAcessoPerfilUsuarios');
         }
   })
    // *******************************************
    // UPDATE - updates a particular tipousuarios
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { tipousuario, statusperfil } = req.body;

        await Tipousuario.update({
            tipousuario,
            statusperfil
        }, {
            where: { id: id }
        });

        res.redirect('/tipousuarios')
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados do tipo de usuario!!!' + err);
    }
});


// *******************************************
// DELETE/DESTROY- removes a single tipousuarios
// *******************************************
roteador.delete('/:id', async(req, res) => {
    // console.log(tipousuarios);
    const { id } = req.params;
    await Tipousuario.destroy({
        where: {
            id: id
        }
    });
    //console.log(tipousuarios);
    res.redirect('/tipousuarios');
});

module.exports = roteador;