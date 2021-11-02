const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../modelos/Categoria");
const Categoria = mongoose.model("categorias");

router.get('/', (req, res) => {
    res.render('admin/index')
});
router.get('/posts', (req, res) => {
    res.send('Página de Posts')
});
router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
});
router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategoria")
});

router.post('/categorias/nova', (req, res) => {
    const novaCategoria = { 
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log('categoria salva com sucesso');
    }).catch((err) => {
        console.log('erro ao salvar categoria');
    })
});

module.exports = router;