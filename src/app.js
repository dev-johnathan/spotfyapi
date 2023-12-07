const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');

app.use(cors());

const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'SpotifyTeam' });
});

//cahamndo servidor
app.listen(PORT, function () {
     console.log(`Servidor exectuando na porta ${PORT}`);
 });

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Rotas



//Rotas
app.use('/spofyteam', require('./routes/routes'));