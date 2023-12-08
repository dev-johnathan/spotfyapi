let option = 'Artistas';
let selectedGenre = '';

function getTracks(event)  {
    option = event.target.value;
}

async function selectGenre(genre){    
    selectedGenre = genre;
    const genreLabel = document.getElementById('genreLabel');
    genreLabel.innerText = selectedGenre;    
    console.log(selectedGenre);

    const div = document.getElementById('frames');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

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
            
            listNames=[]
            listImages=[]
            data.items.forEach(item => {
                

                var trackName = document.createElement('p');
                var trackImage = document.createElement('img');
                if(option == 'Musicas')
                    trackName.textContent = item.track.name;
                    trackImage.src = item.track.album.images[0].url;
                    //console.log(item.track.album.images[0].url)

                if(option == 'Artistas')
                    trackName.textContent = item.track.album.artists[0].name;
                    //trackImage.src=item.track.album.artists[0].images[0].url;
                
                listNames.push(trackName.textContent);
                //listImages.push(trackImage.src);
                
            });

            for(var i=0; i<listNames.length; i++){

                frame= `<div class="frame"">
                        <img src="images/photoMusic.jpg" alt="">
                        <button><img src="images/botao-play (1).png" alt=""></button>
            
                        <p id="MPName">${listNames[i]}</p>
            
                    </div>`;

                novaDiv= document.createElement('div');
                novaDiv.innerHTML = frame;

                document.getElementById('frames').appendChild(novaDiv);
               
            }


            

        });        
    } catch (error) {
        console.log(error);        
    }
}





