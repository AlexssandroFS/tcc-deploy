
const mysql = require('mysql'); /*utilizado para acessar o BD/ */
const express = require('express');
const pg = require('pg');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config()

// Definir a porta para o servidor
const port = 4000 || process.env.PORT;

const session = require('express-session'); /*utilizado para verificar sessao de usuario logado*/
const cookieParser = require("cookie-parser");
//const redditData = require('./data.json');
const connection = mysql.createConnection({
    CONNECTION_STRING:'postgresql',
    Hostname:'dpg-cncdq96v3ddc73c65cq0-a',
    Port:'5432',
    type: 'postgresql',
    Database:'banco_7j3p',
    Username:'root',
    Password:'gG2ilkLhcLRvepD5nsMNN8e8bv2SC3Bv',
    DATABASE_Internal_URL:'postgres://root:gG2ilkLhcLRvepD5nsMNN8e8bv2SC3Bv@dpg-cncdq96v3ddc73c65cq0-a/banco_7j3p',
    DATABASE_External_URL:'postgres://root:gG2ilkLhcLRvepD5nsMNN8e8bv2SC3Bv@dpg-cncdq96v3ddc73c65cq0-a.oregon-postgres.render.com/banco_7j3p',
      synchronize: true,
/*
      type: 'mysql',
    host: 'localhost',
    user: 'root',
    password: '',/*password: '',  indica que o BD está sem senha*/
    
   // database: 'banco',
    /*Nome do BANCO DE DADOS no MySql phpmyadmin*/
 });

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
   
    console.log('acesse: http://localhost:4000/ ou acesse: http://localhost:4000/login')
})

/*https://www.youtube.com/watch?v=gOuJE6d_l-U

app.use((req, res,))
*/
