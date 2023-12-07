const express = require('express');
const router  = express.Router();
const axios   = require('axios');
let spotifyToken = '';

//Credenciais da conta Spotify
const client_id = '5443c46945a54b0b8fe84e8dc2ca5e5a';
const client_secret = 'e3cf60d3f6594ce5aec1c2303c88386c';
const encodedData = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

//Função para gerar o token de autenticação no Spotify
async function getSpotifyToken() {
    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
        'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedData
            }
        });

        const tokenData = tokenResponse.data;
        spotifyToken = tokenData.access_token;
        console.log(`Token ${spotifyToken}`); //Debug        
        return tokenData.access_token;
    } catch (error) {
        console.error(error);
        throw new Error('Erro interno de servidor');
    }
}


getSpotifyToken();

//Rota para busca músicas mais ouvidas por gênero
//http://localhost:3000/spotifyteam/musicasbygenre/:genre
router.post('/musicasbygenre/:genre', async (req, res) => {
    try {
        const genre = req.params.genre; //obtém o parâmetro gênero da URL
        console.log(genre); //debug
        

        if (!genre) {
            return res.status(400).json({ error: 'Um gênereo musical deve ser informado!' });
        }

        // Primeiro obtenho a playlist mais popular para o gênero escolhido
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=1`, {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });
        
        if (response.status === 200) {
        //Obtenho o id da playlist mais popular (primeiro retorno)
        const playlistId = response.data.playlists.items[0].id;

        //Busco as 10 primeiras músicas da playlist
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });
        
        res.json(tracksResponse.data); //retorno dos dados no formato JSON
        const firstItem = tracksResponse.data.items[1].track; //debug        
        console.log(`Primeira música: ${firstItem.name} - ${firstItem.album.artists[0].name} - ${firstItem.duration_ms}s `); //debug

        } else {
            return res.status(404).send({ error: 'Nenhuma playlist encontrada para o gênero especificado!' });
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar músicas por gênero!');
    }
});



//buscando os artistas por gênero
router.get('/', async (req, res) => {
    try {
        const genre = req.params.genre; //obtém o parâmetro gênero da URL
        console.log(genre); //debug

        if (!genre) {
            return res.status(400).json({ error: 'Um gênereo musical deve ser informado!' });
        }

        // Primeiro obtenho as informações do gênero escolhido
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${genre}&type=genre&limit=1`, {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });
        
        if (response.status === 200) {
        //Obtenho o id do gênero (primeiro retorno)
        const genreId = response.data.genres.items[0].id;

        //Busco as informações dos artistas mais ouvidos do gênero
        const artistsResponse = await axios.get(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=1`, {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`
            }
        });
        
        res.json(artistsResponse.data); //retorno dos dados no formato JSON
        const firstItem = artistsResponse.data.items[1].track; //debug        
        console.log(`Primeiro artista: ${firstItem.name} - ${firstItem.album.artists[0].name} - ${firstItem.duration_ms}s `); //debug

        } else {
            return res.status(404).send({ error: 'Nenhum gênero encontrado para o termo especificado!' });
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar artistas por gênero!');
    }
});


module.exports = router;