const express = require('express');
const router  = express.Router();
const axios   = require('axios');
let spotifyToken = '';
const baseURL = 'https://api.spotify.com/v1/';

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

//Rota para buscar os gêneros

getSpotifyToken();



module.exports = router;