//// INICIO paginas dos PERFIS
// Our fake database Admin:
/*
let usuarios = [{
           // id: uuid(),
            tipoperfil: 'Administrador',
            
            login: 'alex',
            senha: '12345',
            statuslogin: 'Ativo',

            nome: 'alexssandro padrilha oliveira',
            cpf: '000.000.000-00',
            datanasc: '13/09/2002',
                        
            endereco: 'Rua C',
            nro: '99',
            complemento: 'casa',
            bairro: 'Centro',
            cidade: 'Jacareí',
            estado: 'SP',
            cep: '12.360-460',
            
            telefone: '1299887755',
            email: 'alex@gmail.com'
        }, {
           // id: uuid(),
            tipoperfil: 'Supervisor',
            
            login: 'teste',
            senha: 'teste',
            statuslogin: 'Inativo',
            
            nome: 'alexssandro padrilha oliveira',
            cpf: '010.010.010-00',
            datanasc: '13/06/2010',

            endereco: 'Rua C',
            nro: '99',
            complemento: 'casa',
            bairro: 'Centro',
            cidade: 'Jacareí',
            estado: 'SP',
            cep: '12.360-460',

            telefone: '1299887755',
            email: 'alex@gmail.com'
        },
        {
           // id: uuid(),
            tipoperfil: 'Atendente',
            
            login: 'lucas',
            senha: 'lucas123',

            nome: 'lucas antunes paiva neto',
            cpf: '022.012.012-00',
            datanasc: '17/06/1989',

            endereco: 'Rua C',
            nro: '99',
            complemento: 'casa',
            bairro: 'Centro',
            cidade: 'Campestre',
            estado: 'MG',
            cep: '12.360-460',

            telefone: '1299887755',
            email: 'lucas@gmail.com'
        },
        {
           // id: uuid(),
            tipoperfil: 'Cliente',
            
            login: 'pedro',
            senha: 'pedro123',
            
            nome: 'pedro henrique muniz',
            cpf: '032.032.012-00',
            datanasc: '17/01/1999',
            
            endereco: 'Rua C',
            nro: '99',
            complemento: 'casa',
            bairro: 'Centro',
            cidade: 'Jacareí',
            estado: 'SP',
            cep: '12.360-460',

            email: 'pedro@gmail.com',
            telefone: '1299887755',
        }
    ]

    */

//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's
//importanto os MODELS 
const { Usuario } = require('../models');
const { Router } = require('express');
const { Login } = require('../models');
const roteador = Router();
const { Endereco } = require('../models');
const { Estado } = require('../models');
const { Contato } = require('../models');
const { Tipousuario } = require('../models');


roteador.get('/relatoriousuarios', async(req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Login.findAll({
            include: [
                { model: Tipousuario },
                { model: Usuario }
            ],

            order: [

                ['tipousuarioid', 'ASC']
            ],
            groupby: [

                ['tipousuarioid', 'ASC']
            ]
        });

        const usuarios = await Usuario.findByPk(id);
        const countUsuario = await Usuario.count();

        res.render('usuarios/relatoriousuarios', { perfil, usuarios, countUsuario });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os usuarios!!!' + err);
    }

});

// **********************************
// INDEX - renders multiple usuarios
// **********************************
//retirando o usuarios após a BARRA - antes  '/usuarios' ...  depois '/'
roteador.get('/', async(req, res) => {
    try {
        const { id } = req.params;

        const usuarios = await Usuario.findAll({
            include: [{
                    model: Login,
                    include: [
                        { model: Tipousuario }
                    ]
                },
               { model: Endereco }
            ],
        }); // Fornecedores aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page
        // const estado = await Estado.findByPk(usuarios.Endereco.estadosid);
        let vetorEstados = []
        for (let usuario of usuarios) {
            let estados = await Estado.findByPk(usuario.Endereco.estadosid);
            vetorEstados.push(estados.estados);
        }

        let vetorTipoUsuario = []
        for (let usuario of usuarios) {
            let tipous = await Tipousuario.findByPk(usuario.Login.tipousuarioid);
            vetorTipoUsuario.push(tipous.tipousuario);
        }
        // console.log('endereco', vetorEstados);

        const countUsuario = await Usuario.count();
        console.log(countUsuario);
        // res.status(201).send(fornecedores);

        res.render('usuarios/index', { usuarios, vetorEstados, vetorTipoUsuario, countUsuario });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os usuarios!!!' + err);
    }
});

// **********************************
// NEW - renders a form
// **********************************
roteador.get('/new', async(req, res) => {
    log = await Login.findAll({
        include: [
            { model: Tipousuario },
            { model: Usuario }
        ],
    });
    const estados = await Estado.findAll();

    const tipousuario = await Tipousuario.findAll({
        order: [
            ['tipousuario', 'ASC'],
        ],
    });
/* l.tipousuarioid == '3' || l.tipousuarioid == '5'*/
if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '4') {
    res.render('usuarios/new', { log, estados, tipousuario });
} else {
    res.render('../erroAcessoPerfilUsuarios');
}

    // 1 - Administrador
    // 2-  Supervidor
    // 3 - Atendente
    // 4 - Gerente
    // 5 - Cliente

    // req.session.tipousuarioid = log[0].tipousuarioid;
    //l = log[0];
    //if (l.Tipousuario.tipousuario == "Administrador") {
    //req.session.usuariologin = log[0].usuariologin; Administrador Cliente  Supervisor Gerente
    // res.render('usuarios/new', { log, estados, tipousuario, l, tipousuarioid: l.tipousuarioid });
    // } else {
    //     res.render('partials/erroAcessoPerfil');
    //}

});

// **********************************
// CREATE - creates a new fornecedores
// **********************************
roteador.post('/', async(req, res) => {
    //dados vindos de Models/Migrations usuarios 
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const datanasc = req.body.datanasc;

    //dados vindos de Models/Migrations para o Login do Tipo Usuario (tipousuarioid)
    //dados vindos de Models/Migrations Login (usuarioid)
    const usuariologin = req.body.usuariologin;
    const senha = req.body.senha;
    const tipousuarioid = req.body.tipousuario;


    //dados vindos de Models/Migrations Estados
    const estadosid = req.body.estados;

    //dados vindos de Models/Migration Contatos
    const email = req.body.email;
    const telefone = req.body.telefone;

    //dados vindos de Models/Migrations Enderecos 
    const endereco = req.body.endereco;
    const nro = req.body.nro;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const cep = req.body.cep;

    // console.log(nro, complemento, bairro, cidade, cep, estadosid, email, senha);
    const novoendereco = await Endereco.create({
        endereco,
        nro,
        complemento,
        bairro,
        cidade,
        cep,
        estadosid
    });

    const novologin = await Login.create({
        usuariologin,
        senha,
        tipousuarioid
    });

    //console.log(novologin.id);
    const novocontato = await Contato.create({
        email,
        telefone
    });

    const loginid = novologin.id;
    const enderecosid = novoendereco.id;
    const contatosid = novocontato.id;
    await Usuario.create({

        nome,
        cpf,
        datanasc,

        loginid,
        enderecosid,
        contatosid

    });

    // console.log(fornecedores);
    res.redirect('/usuarios'); //{estados}
    // res.status(401).send('Algo deu errado!!! Não foi possível cadastrar um novo fornecedor!!!' + err);
});


// *******************************************
// *******************************************
// SHOW - details about one particular usuarios
// *******************************************
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const usuarios = await Usuario.findByPk(id, {
        include: [
            { model: Endereco },
            { model: Contato },
            { model: Login }
        ],
    });

    const estados = await Estado.findByPk(usuarios.Endereco.estadosid);
    const tipous = await Tipousuario.findByPk(usuarios.Login.tipousuarioid);
    //  console.log(categorias);
    //res.status(201).send(fornecedores);
    res.render('usuarios/show', { usuarios, estados, tipous });
});

// *******************************************
// *******************************************

// *******************************************
// EDIT - renders a form to edit a usuarios
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        const { id } = req.params;

        const estados = await Estado.findAll({
            order: [
                ['estados', 'ASC'],
            ],
        });

        const usuarios = await Usuario.findByPk(id, {
            include: [
                { model: Login },
                { model: Endereco },
                { model: Contato }
            ]
        })
        const status = await Login.findAll({
            order: [
                ['statuslogin', 'ASC'],
            ],
        });
        const estadosvalue = await Estado.findByPk(usuarios.Endereco.estadosid);

        //console.log(usuarios);
        const tipous = await Tipousuario.findByPk(usuarios.Login.tipousuarioid);

        res.render('usuarios/edit', { usuarios, estados, tipous, estadosvalue, status });


    })
    // *******************************************
    // UPDATE - updates a particular fornecedores
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;

        //dados vindos de Models/Migrations usuarios 
        const nome = req.body.nome;
        const cpf = req.body.cpf;
        const datanasc = req.body.datanasc;

        //dados vindos de Models/Migration Contatos
        const email = req.body.email;
        const telefone = req.body.telefone;


        //dados vindos de Models/Migrations Login (usuarioid)
        const usuariologin = req.body.usuariologin;
        const senha = req.body.senha;
        const statuslogin = req.body.statuslogin;

        //dados vindos de Models/Migrations Enderecos 
        const endereco = req.body.endereco;
        const nro = req.body.nro;
        const complemento = req.body.complemento;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const cep = req.body.cep;

        //dados vindos de Models/Migrations Estados
        const estadosid = req.body.estados;

        console.log('Atributos do campo do req.body: ', nome, cpf, datanasc, email, telefone, usuariologin, senha, statuslogin,
            endereco, nro, complemento, bairro, cidade, cep, estadosid);

        await Usuario.update({

            //campos iguais a tabela BD
            nome,
            cpf,
            datanasc
        }, {
            where: {
                id: id
            }
        });

        const usuarios = await Usuario.findByPk(id);
        const contatos = await Contato.findByPk(usuarios.contatosid);
        await Contato.update({
            email,
            telefone
        }, {
            where: {
                //  id: contatos,
                id: usuarios.id,
                id: contatos.id,
            }
        });

        const login = await Login.findByPk(usuarios.loginid);
        await Login.update({
            usuariologin,
            senha,
            statuslogin
        }, {
            where: {
                //  id: contatos,
                id: usuarios.id,
                id: login.id,
            }
        });

        const enderecos = await Endereco.findByPk(usuarios.enderecosid);
        await Endereco.update({
            endereco,
            nro,
            complemento,
            bairro,
            cidade,
            cep,
            estadosid
        }, {
            where: {
                //  id: contatos,
                id: usuarios.id,
                id: enderecos.id,
            }

        });


        res.redirect('/usuarios');
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados do usuário!!!' + err);
    }

});


// *******************************************
// DELETE/DESTROY- removes a single usuarios
// *******************************************
roteador.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Usuario.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/usuarios', {});
})

module.exports = roteador;