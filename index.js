const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');

//Config
    // Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
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
        res.send('formulário recebido')
    })

app.listen(8080, function(){
    console.log('Servidor rodando porta 8080');
});