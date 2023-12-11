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
    const title=document.getElementById('title'); //Obtém o title da página selecionada
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
                title.innerHTML='As músicas mais tocadas do gênero '+selectedGenre + ' ♪♫♪';
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
                title.innerHTML='Os artistas em destaque do gênero '+selectedGenre + ' ♪♫♪';
                trackName.textContent = item.track.album.artists[0].name;
                //trackImage.src=item.track.album.artists[0].images[0].url;
            }
            
            listNames.push(trackName.textContent);
            //listImages.push(trackImage.src);
        });

        let frame = ('')
           
        for(let i=0; i<listNames.length; i++){

                        if (option=='Artistas'){
                           frame = `<div class="frame">
                                        <img src="images/photoMusic.jpg" alt="">
                                        <button><img src="images/botao-play (1).png" alt=""></button>
                                        <p id="MPName">${listNames[i]}</p>
                                    </div>`;

                        } 
                        
                        if (option=='Musicas') {
                            frame = `<div class="iframe">
                                        <p id="iFrame">${listNames[i]}</p>
                                    </div>`;
                        }

            let novaDiv = document.createElement('div');
            novaDiv.innerHTML = frame;

            document.getElementById('frames').appendChild(novaDiv);
        }
    } catch (error) {
        console.log(error); // Registra o erro        
    }
}
