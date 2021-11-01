//Módulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
//const mongoose = require('mongoose')

//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose

//Rotas
    app.use('/admin', admin);
//Outros
const Port = 8080;
app.listen(Port, () => {
    console.log('servidor rodando')
});