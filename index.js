function fetchTracksByGenre(genre, token) {
    fetch(`https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token }
    })
    .then(response => response.json())
    .then(data => {
        // Em seguida, para cada playlist, obtenha suas faixas
        data.playlists.items.forEach(playlist => {
            fetch(playlist.tracks.href, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token }
            })
            .then(response => response.json())
            .then(data => {
                // Crie um elemento HTML para cada faixa e adicione ao documento
                data.items.forEach(item => {
                    console.log(item.track.name);
                    var trackElement = document.createElement('p');
                    trackElement.textContent = item.track.name;
                    document.getElementById('tracks').appendChild(trackElement);
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
}

var client_id = '5443c46945a54b0b8fe84e8dc2ca5e5a'; 
var client_secret = 'e3cf60d3f6594ce5aec1c2303c88386c'; 
var encodedData = btoa(client_id + ':' + client_secret);

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedData
    },
    body: 'grant_type=client_credentials'
})
.then(response => response.json())
.then(data => {
    console.log(data.access_token, 'Sucessfull');

    const token = data.access_token;
    var genres = ["acoustic", "funk", "mpb","pop", "r-n-b", "rock"]

    genres.forEach(genre => {
        fetchTracksByGenre(genre, token);
    });
})
.catch(err => {
    console.log(err, 'error! Cant acess the data.');
});
function selectGenre(genre) {
                
    const clickedButton = document.getElementById(genre);
    
    document.querySelectorAll('.button').forEach(button => {
        button.classList.remove('active');
    });

    clickedButton.classList.add('active');
}