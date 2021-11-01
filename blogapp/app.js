//Módulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const app = express();
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

//Outros
const Port = 8080;
app.listen(PORT, () => {
    console.log('servidor rodando')
});