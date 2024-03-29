
const mysql = require('mysql'); /*utilizado para acessar o BD/ */
const express = require('express');
const pg = require('pg');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config()

// Definir a porta para o servidor
const port = process.env.PORT || 4000;
const session = require('express-session'); /*utilizado para verificar sessao de usuario logado*/
const cookieParser = require("cookie-parser");
//const redditData = require('./data.json');


//recebendo o controler pelo index.js dentro do diretorio controllers
const controller = require('./controllers');
const methodOverride = require('method-override');
//const { v4: uuid } = require('uuid');
const path = require('path');
//var session;

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "teste123456",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false

}));

app.use(methodOverride('_method')); //Precis DISTO PARA 'EDIT'/'_method=PATCH'  funcionar: botoes "SAVE" e "DELETE"
//app.set('port', process.env.port || port); // set express to use this port
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload()); // configure fileupload
app.use(cookieParser());

app.use(session({ secret: 'teste123456' }));
app.use(bodyParser.urlencoded({ extended: true }));

//importanto o Controller roteador ' '
app.use('/cardapios', controller.cardapios);
app.use('/categorias', controller.categorias);
app.use('/fornecedores', controller.fornecedores);
app.use('/galeriapedidos', controller.galeriapedidos);
app.use('/produtos', controller.produtos);

app.use('/usuarios', controller.usuarios);
app.use('/login', controller.login);
app.use('/despesas', controller.despesas);

app.use('/pedidos', controller.pedidos);
app.use('/formapagtos', controller.formapagtos);
app.use('/tipousuarios', controller.tipousuarios);

/*
const login = [
    { usuariologin: 'Jones', senha: 'jones' },
    { usuariologin: 'Henrique', senha: 'henrique' }
]
*/
//var usuariologin = "admin";
//var senha = "12345";



app.get('/logout', async(req, res) => {

    req.session.destroy();
    console.log("Usuário deslogado com sucesso!!!  Redirecionando para Página Inicial!");

    res.redirect('/');

});


// index page home principal do site usuario em geral
app.get('/', async(req, res) => {
    res.render('homesite/homesite');
    console.log("Página Inicial carregada com sucesso!");
});


// index page HOME - pagina de MENU usuarios
app.get('/home', async(req, res) => {
    res.render('partials/home', {}); //{ login: login } são PARÂMETROS para renderizar pagina web

});

app.get('/despesas', async(req, res) => {
    res.render('partials/home', {});
});

app.get('/produtos', async(req, res) => {
    res.render('partials/home', {});
});

app.get('/fornecedores', async(req, res) => {
    res.render('partials/home', {});
});

app.get('/usuarios', async(req, res) => {
    res.render('partials/home', {});
});

app.get('/pedidos', async(req, res) => {
    res.render('partials/home', {});
});

app.get('/menurelatorios', (req, res) => {
    res.render('menu_relatorios');
});


app.listen(port, () => {
    console.log(`Server running on port server postgreSQL: ${port}`);
    console.log(`Acessar a página Homesite http://localhost:4000`);
    console.log(`Acessar a página Login para área Restrita at http://localhost:4000/login`);
    console.log(`Acessar Render: https://tcc-deploy-3wjv.onrender.com`);
});
