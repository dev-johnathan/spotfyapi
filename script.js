let option = 'Artistas';
let selectedGenre = ''

function getTracks(event)  {
    option = event.target.value;
}

async function selectGenre(genre){    
    selectedGenre = genre;
    const genreLabel = document.getElementById('genreLabel');
    genreLabel.innerText = selectedGenre;    
    console.log(selectedGenre);

    //Busca músicas playlist
    try {
        const response = fetch(`http://localhost:3000/spofyteam/musicasbygenre/${selectedGenre}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {

            document.querySelectorAll('p').forEach(function(pElement) {
                pElement.remove();
            });
            
            data.items.forEach(item => {
                
                var trackName = document.createElement('p');
                if(option == 'Musicas')
                    trackName.textContent = item.track.name;
                if(option == 'Artistas')
                    trackName.textContent = item.track.album.artists[0].name;             
                document.getElementById('frame').appendChild(trackName);
            });

        });        
    } catch (error) {
        console.log(error);        
    }
}






