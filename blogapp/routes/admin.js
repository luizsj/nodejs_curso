const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../models/Postagem");
const Postagem = mongoose.model("postagens");
const { isAdmin } = require("../helpers/is_admin")

router.get('/', isAdmin, (req, res) => {
    res.render('admin/index')
});
router.get('/posts', isAdmin, (req, res) => {
    res.send('Página de Posts')
});
router.get('/categorias', isAdmin, (req, res) => {
    Categoria.find().sort({date:'desc'}).then((categorias) => {
        res.render("admin/categorias",  {categorias: categorias.map(categorias => categorias.toJSON())})
    }).catch((err) => {
        req.flash("error_msg", "Erro ao listar categorias");
        res.redirect('/admin');
    })
    
});
router.get('/categorias/add', isAdmin, (req, res) => {
    res.render("admin/addcategoria")
});

router.post('/categorias/nova', isAdmin, (req, res) => {
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

router.get("/categorias/edit/:id", isAdmin, (req,res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategoria', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg',  'Categoria não existe');
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/edit", isAdmin, (req, res) => {
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

router.post("/categorias/deletar", isAdmin, (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash('success_msg',  'Categoria DELETADA com sucesso');
        res.redirect("/admin/categorias");
    }).catch((err) => {
        req.flash('error_msg',  'Erro ao deletar categoria');
        res.redirect("/admin/categorias")          
    })
})

router.get("/postagens", isAdmin, (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("admin/postagens", { postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Erro ao listar as postagens!")
        res.redirect("/admin/postagens")
    })
})

router.get('/postagens/add', isAdmin, (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg',  'Erro ao carregar o formulário');
        res.redirect("/admin");
    })
})

router.post("/postagens/nova", isAdmin, (req, res) => {
    var erros = []
    if (req.body.categoria == "0") {
        erros.push({text: "Categoria inválida, necessário registrar pelo menos uma."})
    }
    if (erros.length > 0) {
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg",  "Erro ao salvar a postagem!")
            res.redirect("/admin/postagens")
        })
    }
})

router.get("/postagens/edit/:id", isAdmin, (req, res) => {
    Postagem.findOne({_id: req.params.id}).lean().then((postagem) => {
        Categoria.find().lean().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem});
        }).catch((err) => {
            req.flash("error_msg",  "Erro ao listar categorias!")
            res.redirect("/admin/postagens") 
        })
    }).catch((err) => {
        req.flash("error_msg",  "Erro ao carregar a postagem!")
        res.redirect("/admin/postagens")        
    })
})

router.post("/postagem/edit", isAdmin, (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.categoria = req.body.categoria
        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("/admin/postagens")            
        }).catch((err) => {
            req.flash("error_msg",  "Erro ao salvar edição da postagem!")
            res.redirect("/admin/postagens")             
        })
    }).catch((err) => {
        req.flash("error_msg",  "Erro ao salvar edição da postagem!")
        res.redirect("/admin/postagens")           
    })
})

router.get("/postagens/deletar/:id", isAdmin, (req, res) => {
    Postagem.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Postagem excluida com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg",  "Erro interno!")
        res.redirect("/admin/postagens")  
    })
})


module.exports = router;