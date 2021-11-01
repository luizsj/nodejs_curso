const { MongoServerSelectionError } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/aprendendo").then(() => {
    console.log("mongo db conectado")
}).catch((err) => {
    console.log("erro ao conectar ao mongodb: "+err)
});

//Model - Usuários

const UsuarioSchame = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String,
    }
});

//Collection
mongoose.model('usuarios', UsuarioSchame);

const Usuario= mongoose.model('usuarios');

new Usuario({
    nome: "Luiz",
    sobrenome: "Soares",
    email: "teste@gmail.com",
    idade: 45,
    pais: 'Brasil'
}).save().then(() => {
    console.log("usuario criado com sucesso")
}).catch((err) => {
    console.log('erro ao salvar usuario' +err)
});