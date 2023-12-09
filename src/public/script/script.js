// Declaração de variáveis globais
let option = 'Artistas';
let selectedGenre = '';

// Função para obter as faixas selecionadas
function getTracks(event)  {
    option = event.target.value; // Atualiza a opção com base no valor do evento de entrada
}

// Função assíncrona para selecionar o gênero
async function selectGenre(genre){    
    selectedGenre = genre; // Atualiza o gênero selecionado
    const genreLabel = document.getElementById('genreLabel'); // Obtém o elemento do rótulo do gênero
    genreLabel.innerText = selectedGenre; // Atualiza o texto do rótulo do gênero
    console.log(selectedGenre); // Registra o gênero selecionado

    const div = document.getElementById('frames'); // Obtém o elemento div
    while (div.firstChild) { // Enquanto houver um primeiro filho na div
        div.removeChild(div.firstChild); // Remove o primeiro filho
    }

    // Busca músicas da playlist
    try {
        const response = await fetch(`http://localhost:3000/spofyteam/musicasbygenre/${selectedGenre}`, {
            method: 'POST',
        });
        const data = await response.json();

        document.querySelectorAll('p').forEach(function(pElement) {
            pElement.remove(); // Remove todos os elementos 'p'
        });
        
        let listNames = [];
        let listImages = [];
        data.items.forEach(item => {
            let trackName = document.createElement('p');
            let trackImage = document.createElement('img');
            if(option == 'Musicas') {
                // Cria um novo elemento 'iframe' para o player da música
                let trackPlayer = document.createElement('iframe');
                trackPlayer.src = 'https://open.spotify.com/embed/track/' + item.track.id;
                trackPlayer.width = '300';
                trackPlayer.height = '80';
                trackPlayer.frameborder = '0';
                trackPlayer.allowtransparency = 'true';
                trackPlayer.allow = 'encrypted-media';

                // Adiciona o player da música ao elemento com id 'frames'
                document.getElementById('frames').appendChild(trackPlayer);
            }
            if(option == 'Artistas') {
                trackName.textContent = item.track.album.artists[0].name;
                //trackImage.src=item.track.album.artists[0].images[0].url;
            }
            
            listNames.push(trackName.textContent);
            //listImages.push(trackImage.src);
        });

        for(let i=0; i<listNames.length; i++){
            let frame = `<div class="frame">
                            <img src="images/photoMusic.jpg" alt="">
                            <button><img src="images/botao-play (1).png" alt=""></button>
                            <p id="MPName">${listNames[i]}</p>
                            <p id="iFrame">${trackPlayer[i]}</p>
                        </div>`;

            let novaDiv = document.createElement('div');
            novaDiv.innerHTML = frame;

            document.getElementById('frames').appendChild(novaDiv);
        }
    } catch (error) {
        console.log(error); // Registra o erro        
    }
}
