const express = require('express');
const app = express();


app.get("/", function(req, res){
    res.sendFile(__dirname+"/html/index.html")
});

app.get("/sobre", function(req, res){
    res.sendFile(__dirname+"/html/sobre.html")
});

app.get("/login", function(req, res){
    res.send('Teste Rota Login');
});

app.get("/ola/:cargo/:nome", function(req, res){
    //res.send(req.params);
    res.send('Ola ' + req.params.nome + ' '+req.params.cargo);
});


app.listen(8080, function(){
    console.log('Servidor rodando porta 8080');
});