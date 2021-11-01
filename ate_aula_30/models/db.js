const Sequelize = require('sequelize');
    // conexao banco de dados
    const sequelize = new Sequelize('postapp', 'root', 'm6rpt2m6'
    , { host: "localhost"
        , dialect: 'mysql'
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}    