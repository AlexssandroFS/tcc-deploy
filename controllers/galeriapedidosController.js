//importanto o modulo uuid para BD ficticio
const { v4: uuid } = require('uuid'); //For generating ID's
const methodOverride = require('method-override');

const { Router } = require('express');
const roteador = Router();


// Our fake database:
let galeriapedidos = [{
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-1.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-2.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-3.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-4.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-5.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-6.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-7.jpg',
    },
    {
        id: uuid(),
        imggaleriapedidos: '../img/gallery/gallery-8.jpg',
    }


]

// **********************************
// INDEX - renders multiple comments
// **********************************
roteador.get('/', (req, res) => {
    res.render('manut-site-galeriapedidos/index', { galeriapedidos });
})

// **********************************

// NEW - renders a form
// **********************************
roteador.get('/new', (req, res) => {
        res.render('manut-site-galeriapedidos/new');
    })
    // **********************************
    // CREATE - creates a new comment
    // **********************************
roteador.post('/', (req, res) => {
    const { imggaleriapedidos } = req.body;
    galeriapedidos.push({ imggaleriapedidos, id: uuid() })
    res.redirect('/galeriapedidos');
})

// *******************************************
// SHOW - details about one particular comment
// *******************************************
roteador.get('/:id', (req, res) => {
        const { id } = req.params;
        const comment = galeriapedidos.find(c => c.id === id);
        res.render('manut-site-galeriapedidos/show', { comment })
    })
    // *******************************************
    // EDIT - renders a form to edit a comment
    // *******************************************
roteador.get('/:id/edit', (req, res) => {
        const { id } = req.params;
        const comment = galeriapedidos.find(c => c.id === id);
        console.log(comment);
        res.render('manut-site-galeriapedidos/edit', { comment })
    })
    // *******************************************
    // UPDATE - updates a particular comment
    // *******************************************
roteador.patch('/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = galeriapedidos.find(c => c.id === id);
    //get new text from req.body
    const newImggaleriapedidosText = req.body.imggaleriapedidos;

    //update the comment with the data from req.body:
    foundComment.imggaleriapedidos = newImggaleriapedidosText;

    //redirect back to index (or wherever you want)
    console.log(foundComment);
    res.redirect('/galeriapedidos')
})

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
roteador.delete('/:id', (req, res) => {
    const { id } = req.params;
    galeriapedidos = galeriapedidos.filter(c => c.id !== id);
    res.redirect('/galeriapedidos');
})

/***********************************************/
module.exports = roteador;