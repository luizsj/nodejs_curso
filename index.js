const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

//Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
    // conexao banco de dados
        const sequelize = new Sequelize('test', 'root', 'm6rpt2m6'
            , { host: "localhost"
                , dialect: 'mysql'
            });

//Rotas
    app.get('/cad', function(req, res){
        res.render('formulario')
    });
    app.post('/form_postagem', function(req, res){
        res.send('formulário recebido<br>'
                +'Texto: '+req.body.titulo + '<br>'
                +'Conteudo: '+req.body.conteudo
                )
    })

app.listen(8080, function(){
    console.log('Servidor rodando porta 8080');
});