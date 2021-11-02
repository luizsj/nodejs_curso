//Módulos

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require("path");
const mongoose = require('mongoose')

//Configurações
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
    app.use('/admin', admin);
//Outros
const Port = 8080;
app.listen(Port, () => {
    console.log('servidor rodando')
});