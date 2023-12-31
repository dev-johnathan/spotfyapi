const express = require('express');
const router  = express.Router();
const axios   = require('axios');
let spotifyToken = '';

//Credenciais da conta Spotify
const client_id = '//insira seu id aqui// ';
const client_secret = '//insira sua senha//';
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
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`, {
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


module.exports = router;
