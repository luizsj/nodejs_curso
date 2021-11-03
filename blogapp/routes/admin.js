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
    Categoria.find().sort({date:'desc'}).then((categorias) => {
        res.render("admin/categorias",  {categorias: categorias.map(categorias => categorias.toJSON())})
    }).catch((err) => {
        req.flash("error_msg", "Erro ao listar categorias");
        res.redirect('/admin');
    })
    
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

router.get("/categorias/edit/:id", (req,res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategoria', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg',  'Categoria não existe');
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/edit", (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug
        categoria.save().then(() => {
            req.flash('success_msg',  'Categoria alterada com sucesso');
            res.redirect("/admin/categorias");
        }).catch((err) => {
            req.flash('error_msg',  'Erro ao salvar alteração');
            res.redirect("/admin/categorias")            
        })
    }).catch((err) => {
        req.flash('error_msg',  'Categoria não existe, erro ao atualizar <br>' + err + '<br>'+req.body.id);
        res.redirect("/admin/categorias")        
    })
})

module.exports = router;