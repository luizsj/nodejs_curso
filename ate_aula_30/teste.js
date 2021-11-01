
const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', 'm6rpt2m6'
    , { host: "localhost"
        , dialect: 'mysql'
    });

const Postagem = sequelize.define('postagens', {
    titulo: { type: Sequelize.STRING}
    , conteudo: { type: Sequelize.TEXT}
})

/*
Postagem.sync({ force: true})
Postagem.create({
    titulo: "teste de postagem",
    conteudo: "sljaljl lajldjflajfljsddlfjal lajflkjdlkajjdljlajdla"
});
*/

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});
/*Usuario.sync({force: true});
*/
Usuario.create({
    nome: "luiz",
    sobrenome: "soares",
    idade:45,
    email: 'teste@gmail.com' 
});




/*
sequelize.authenticate().then(function(){
    console.log('Conectado ao mysql')
}).catch(function(erro){
    console.log("falha na conexao" + erro)
});
*/