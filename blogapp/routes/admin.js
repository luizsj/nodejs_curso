const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
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
    var erros = [];
    if (!req.body.nome || typeof(req.body.nome) == undefined || req.body.nome == null) {
        erros.push({text: "Nome inválido"})
    }
    if (!req.body.slug || typeof(req.body.slug) == undefined || req.body.slug == null) {
        erros.push({ text: "Slug inválido"})
    }

    if (erros.length > 0) {
        res.render("admin/addcategoria", {erros: erros})
    }
    else {
        const novaCategoria = { 
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "categoria criada com sucesso");
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "erro ao salvar");
            res.redirect("/admin");
        })
    }
});

module.exports = router;