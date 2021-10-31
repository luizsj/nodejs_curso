const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', 'm6rpt2m6'
    , { host: "localhost"
        , dialect: 'mysql'
    });

sequelize.authenticate().then(function(){
    console.log('Conectado ao mysql')
}).catch(function(erro){
    console.log("falha na conexao" + erro)
});