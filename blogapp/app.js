//Módulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require("./models/Postagem");
const Postagem = mongoose.model("postagens")
require("./models/Categoria");
const Categoria = mongoose.model("categorias")
const passport = require("passport")
require("./config/auth")(passport)
//rotass externas
const admin = require('./routes/admin');
const usuarios = require('./routes/usuario');

//Configurações
    //Sessão
        app.use(session({
            secret: "testedesecret",
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash());
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    });  
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Public
        app.use(express.static(path.join(__dirname, 'public'))); 
     
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log(' conectado banco de dados')
        }).catch((err) => {
            console.log(' erro banco de dados: '+err)
        });

//Rotas
    app.get('/', (req, res) => {
        Postagem.find().populate("categoria").sort({data: "desc"}).lean().then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg",  "Houve um erro interno!")
            res.redirect("/404")  
        })
    })
    app.get("/postagem/:slug", (req, res) => {
        Postagem.findOne({slug:req.params.slug}).lean().then((postagem) => {
            if (postagem){
                res.render("postagem/index", {postagem: postagem})
            }else{
                req.flash("error_msg",  "Postagem não existe!")
                res.redirect("/")                
            }
        }).catch((err) => {
            req.flash("error_msg",  "Houve um erro interno!")
            res.redirect("/")             
        })
    })

    app.get("/categorias", (req, res) => {
        Categoria.find().lean().then((categorias) =>{
            res.render("categorias/index", {categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg",  "Erro ao listar categorias!")
            res.redirect("/")             
        })
    })
    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug:req.params.slug}).lean().then((categoria) => {
            if (categoria){
                Postagem.find({categoria: categoria._id}).sort({data: "desc"}).lean().then((postagens) => {
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("error_msg",  "Erro ao listar os posts da categoria!")
                    res.redirect("/")  
                })
            }else{
                req.flash("error_msg",  "Categoria não existe!")
                res.redirect("/")                
            }
        }).catch((err) => {
            req.flash("error_msg",  "Houve um erro interno!")
            res.redirect("/")             
        })
    })

    app.get("/404", (req, res) => {
        res.send('Erro 404!')
    })


    app.use('/admin', admin);
    app.use('/usuarios', usuarios);
//Outros
const Port = 8080;
app.listen(Port, () => {
    console.log('servidor rodando')
});