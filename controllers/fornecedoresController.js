//importanto o modulo uuid para BD ficticio
//const { v4: uuid } = require('uuid'); //For generating ID's


/*
// Our fake database fornecedores:
let fornecedores = [{
            id: uuid(),
            ramoatuacao: 'alimentos, doces, açaí',
            razaosocial: 'Atenas',
            nomefantasia: 'doces & cia',
            cnpj: '33.333.333/3333-33',
            
            endereco: 'Rua Atenas',
            nro: '1500',
            complemento: 'Barracao',
            bairro: 'centro',
            cidade: 'Jacarei', 
            cep: '12-300-420',
            
            //dados do endereço estão pela tabela "estados"
            sigla: 'SP',
            estado: 'São Paulo',
            
            telefone: '129999-9999',
            email: 'atenas@atenas.com.br'

         },
        {
            id: uuid(),
            ramoatuacao: 'bebidas, sucos, refrigerantes',
            razaosocial: 'Maribeu',
            nomefantasia: 'Maribeu descartáveis',
            cnpj: '11.111.111/1111-11',
            
            endereco: 'Rua Jupter',
            nro: '100',
            complemento: 'Barracao',
            bairro: 'Jd Sao Dimas',
            cidade: 'Jacarei',
            cep: '12-300-420',

            //dados do endereço estão pela tabela "estados"
            sigla: 'SP',
            estado: 'São Paulo',

            telefone: '129999-9999',
            email: 'maribeu@maribeu.com.br'
        },
        {
            id: uuid(),
                        
            //dados do fornecedor estão pela tabela "fornecedores"
            razaosocial: 'Palucia',
            nomefantasia: 'balas & doces Palucia',
            cnpj: '22.222.222/2222-22',
            ramoatuacao: 'material descartável',

            //dados do endereço estão pela tabela "endereços"
            endereco: 'Rua Jupter',
            nro: '100',
            complemento: 'Barracao',
            bairro: 'Jd Sao Dimas',
            cidade: 'Belo Horizonte',
            cep: '12-300-420',

           //dados do endereço estão pela tabela "estados"
            sigla: 'MG',
            estado: 'Minas Gerais',

            //dados do contato estão pela tabela "contatos"
            telefone: '129999-9999',
            email: 'maribeu@maribeu.com.br'
        },
         {
            id: uuid(),
                        
            //dados do fornecedor estão pela tabela "fornecedores"
            razaosocial: 'RefriGel Ltda',
            nomefantasia: 'RefriGel',
            cnpj: '44.444.444/4444-44',
            ramoatuacao: 'refrigerante',

            //dados do endereço estão pela tabela "endereços"
            endereco: 'Rua Jupter',
            nro: '100',
            complemento: 'Barracao',
            bairro: 'Jd Sao Dimas',
            cidade: 'Belo Horizonte',
            cep: '12-300-420',

           //dados do endereço estão pela tabela "estados"
            sigla: 'MT',
            estado: 'Mato Grosso',

            //dados do contato estão pela tabela "contatos"
            telefone: '129999-9999',
            email: 'maribeu@maribeu.com.br'
        }
    ]
    */
//importanto os MODELS
const { Fornecedore } = require('../models');
const { Endereco } = require('../models');
const { Contato } = require('../models');
const { Estado } = require('../models');
const { ProdutoEntrada, Produto } = require('../models');

const { Router } = require('express');
const roteador = Router();


roteador.get('/relatoriofornecedores', async(req, res) => {
    try {
        const { id } = req.params;
        const fornecedores = await ProdutoEntrada.findAll({
            include: [{
                    model: Fornecedore,
                    include: [
                        { model: Endereco },
                        { model: Contato }
                    ],
                },
                {
                    model: Produto,
                },
            ],
            order: [
                [
                    'fornecedoresid', 'ASC',
                ],
            ],
           group :[
                [
                    'Produto.nomeprod',
                ],
            ],
        });

        const dadosentradas = await ProdutoEntrada.findAll({
            include: [
                { model: Fornecedore },
                { model: Produto }
            ],
        });

        let vetorEstados = []
        for (let estadoforn of dadosentradas) {
            let estado = await Estado.findByPk(estadoforn.Fornecedore.enderecosid);
            vetorEstados.push(estado.estados);
        }

        //const dadosProd = await Produto.findByPk(produtos.fornecedoresid);

        const countRelForn = await Fornecedore.count({
            include: [
                    {model: Endereco },
                    { model: Contato },
            ],
            include: [{
                    model: ProdutoEntrada,
                    include: [{
                        model: Produto,
            },],
            order: [
                [
                    'fornecedoresid', 'ASC',
                ],
            ],
            group :[
                [
                    'Produto.nomeprod',
                ],
            ],
        },],
       
        }
        );
    
       
        let vetorNomeProd = []
        for (let entprodnomes of dadosentradas) {
            let dadosProd = await ProdutoEntrada.findByPk(entprodnomes.produtosid);
            vetorNomeProd.push(dadosProd.nomeprod);
        }


        const countProdEnt = await ProdutoEntrada.count({
            include: [{
                model: Fornecedore,
                include: [
                    { model: Endereco },
                    { model: Contato }
                ],
          
            order: [
                [
                    'fornecedoresid', 'ASC',
                ],
            ],
           group :[
                [
                    'Produto.nomeprod',
                ],
            ],
            },
            {
                model: Produto,
            },
         ],
        }
        );

        console.log(countRelForn);
        // res.status(201).send(fornecedores);
        res.render('fornecedores/relatoriofornecedores', { fornecedores, dadosentradas, countRelForn, countProdEnt, vetorEstados });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os fornecedores!!!' + err);
    }

});
// **********************************
// INDEX - renders multiple fornecedores
// **********************************

//retirando o fornecedores após a BARRA - antes  '/fornecedores' ...  depois '/'
roteador.get('/', async(req, res) => {
            
    try {
        const { id } = req.params;
        const produtos = await Produto.findAll();

        const fornecedores = await Fornecedore.findAll({
            include: [
                { model: Endereco },
                { model: Contato }
            ],
        }); // Fornecedores aqui é o NOME da TABELA - "findAll" é  LISTAR os dados na page

        // const estado = await Estado.findByPk(fornecedores.Endereco.estadosid);
        let vetorEstados = []
        for (let fornecedor of fornecedores) {
            let estado = await Estado.findByPk(fornecedor.Endereco.estadosid);
            vetorEstados.push(estado.estados);
        }

        /*
        let vetorProd = []
        for (let fornecedor of fornecedores) {
            let produto = await Produto.findByPk(fornecedor.Produto.fornecedoresid);
            vetorProd.push(produto.nomeprod);
        }
*/

        // console.log('endereco', vetorEstados);

        const countFornecedor = await Fornecedore.count();
        console.log(countFornecedor);
        // res.status(201).send(fornecedores);
        res.render('fornecedores/index', { fornecedores, produtos, vetorEstados, countFornecedor });
    } catch (err) {
        //return res.status(500).send({ err });
        res.status(401).send('Algo deu errado!!! Não foi possível listar os fornecedores!!!' + err);
    }

});
// **********************************
// NEW - renders a form
// **********************************
roteador.get('/new', async(req, res) => {
    const estados = await Estado.findAll();
    //console.log(fornecedores);
    if (l.tipousuarioid == '1' || l.tipousuarioid == '2' || l.tipousuarioid == '3'|| l.tipousuarioid == '4') {
    res.render('fornecedores/new', { estados });
} else {
    res.render('../erroAcessoPerfilUsuarios');
 }
});
// **********************************
// CREATE - creates a new fornecedores
// **********************************
roteador.post('/', async(req, res) => {
    try { //dados vindos de Models/Migrations Fornecedores 
        const razaosocial = req.body.razaosocial;
        const nomefantasia = req.body.nomefantasia;
        const cnpj = req.body.cnpj;
        const ramoatuacao = req.body.ramoatuacao;

        //dados vindos de Models/Migrations Estados
        const estadosid = req.body.estadosid;

        //dados vindos de Models/Migrations Enderecos 
        const endereco = req.body.endereco;
        const nro = req.body.nro;
        const complemento = req.body.complemento;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const cep = req.body.cep;

        //dados vindos de Models/Migration Contatos
        const email = req.body.email;
        const telefone = req.body.telefone;

        const novoendereco = await Endereco.create({
            endereco,
            nro,
            complemento,
            bairro,
            cidade,
            cep,
            estadosid
        });

        const novocontato = await Contato.create({
            email,
            telefone
        });

        const enderecosid = novoendereco.id;
        const contatosid = novocontato.id;

        await Fornecedore.create({

            razaosocial,
            nomefantasia,
            cnpj,
            ramoatuacao,

            enderecosid,
            contatosid

        });

        // console.log(fornecedores);
        res.redirect('/fornecedores');
    } catch (error) {
        res.status(401).send('Algo deu errado!!! Não foi possível cadastrar um novo fornecedor!!!' + err);
    }
})

// *******************************************
// *******************************************
// SHOW - details about one particular fornecedores
// *******************************************
roteador.get('/:id', async(req, res) => {
    const { id } = req.params;
    const fornecedores = await Fornecedore.findByPk(id, {
        include: [
            { model: Endereco },
            { model: Contato }
        ],
    });
    const estado = await Estado.findByPk(fornecedores.Endereco.estadosid);

    //console.log(estados);
    //res.status(201).send(fornecedores);
    res.render('fornecedores/show', { fornecedores, estado });
})

// *******************************************
// EDIT - renders a form to edit a fornecedores
// *******************************************
roteador.get('/:id/edit', async(req, res) => {
        try {
            const { id } = req.params;
            const estados = await Estado.findAll();
            const fornecedores = await Fornecedore.findByPk(id, {
                    include: [
                        { model: Endereco },
                        { model: Contato }
                    ],

                })
                //console.log(usuarios);
            const estadosvalue = await Estado.findByPk(fornecedores.Endereco.estadosid);

            res.render('fornecedores/edit', { fornecedores, estados, estadosvalue })
        } catch (error) {
            res.status(401).send('Algo deu errado!!! Não foi possível acessar a página de edição de cadastro do fornecedor!!!' + { razaosocial } + err);
        }
    })
    // *******************************************
    // UPDATE - updates a particular fornecedores
    // *******************************************
roteador.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;

        //dados vindos de Models/Migrations Fornecedores 
        const razaosocial = req.body.razaosocial;
        const nomefantasia = req.body.nomefantasia;
        const cnpj = req.body.cnpj;
        const ramoatuacao = req.body.ramoatuacao;

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

        //dados vindos de Models/Migrations Estados
        const estados = req.body.estados;

        console.log('Atributos do campo do req.body: ', razaosocial, nomefantasia, cnpj, ramoatuacao, email, telefone,
            endereco, nro, complemento, bairro, cidade, cep, estados);

        await Fornecedore.update({
            razaosocial,
            nomefantasia,
            cnpj,
            ramoatuacao,
        }, {
            where: {
                id: id,
            },
        });

        const fornecedores = await Fornecedore.findByPk(id);
        const contatos = await Contato.findByPk(fornecedores.contatosid);
        await Contato.update({
            email,
            telefone
        }, {
            where: {
                //  id: contatos,
                id: fornecedores.id,
                id: contatos.id,
            }
        });

        const estadosid = estados;
        const enderecos = await Endereco.findByPk(fornecedores.enderecosid);

        console.log(endereco,
            nro,
            complemento,
            bairro,
            cidade,
            cep,
            estadosid);

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
                id: fornecedores.id,
                id: enderecos.id,
            }

        });

        /* const estadosid = estados;
        const estadoend = await Endereco.findByPk(fornecedores.enderecosid);
        await Endereco.update({
            estadosid
        }, {
            where: {
                id: fornecedores.id,
                //id: enderecos.id,
                id: estadoend.id,
            }
        });
*/
        res.redirect('/fornecedores');
    } catch (err) {
        res.status(401).send('Algo deu errado!!! Não foi possível ATUALIZAR os dados do fornecedor!!!' + err);
    }
});
// *******************************************
// DELETE/DESTROY- removes a single fornecedores
// *******************************************
roteador.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Fornecedore.destroy({
        where: {
            id: id
        }
    });
    res.redirect('/fornecedores');
});

module.exports = roteador;
