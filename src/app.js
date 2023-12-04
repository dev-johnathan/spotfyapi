const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`Servidor exectuando na porta ${PORT}`)
});

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Rotas
app.get('/', (req, res) => {
    res.send('Seja bem vindo ao Spofy Team!');
});