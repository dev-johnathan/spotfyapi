# Spofyteam - Descubra os hits mais tocados do momento

## Propósito e utilização do sistema
Nosso sistema utiliza a API do Spotify para facilitar a busca por músicas e artistas tops em quatro estilos: Sertanejo, Pop, Rock e Alternativa. Escolha o gênero e opte por ver as músicas mais populares ou os artistas mais ouvidos. Se quiser curtir um som, escolha "músicas" e veja a lista com um botão para ouvir. Se estiver mais interessado nos artistas, clique em "artistas" e confira os nomes em destaque no gênero escolhido. Ao clicar no gênero desejado e escolher entre músicas ou artistas, você fica por dentro das últimas novidades, conectando-se com o que está bombando na sua vibe musical.

## 💻 Tecnologias utilizadas
- HTML
- CSS
- JavaScript
  - Node.js
  - Express
  - Cors
  - Axios

### 🛣️ Rota
| Operação | Rota | Retorno |
| ------ | ------ | ------ |
| BASE URL| http://localhost:3000 | URL base|
| POST | /spotifyteam/musicasbygenre/:genre| busca os hits conforme gênero informado |

### 📋 Instruções de execução via terminal
- Clonar o repositório
- Instalar as dependências do Node: pasta src
```sh
npm install
```
- Na pasta src iniciar o servidor através do comando
```sh
npm run dev
```
- No navegador de escolha, acessar a url localhost:3000

## 🎨 Interface

**🏠 Página Principal**

![image](https://github.com/Compass-pb-aws-2023-IFSP-IFGOIANO/sprint-2-pb-aws-ifsp-ifgoiano/assets/124719932/30fe086b-fcd0-44a9-bfb4-0246282dc436)

**🔎 Página das músicas mais ouvidas do gênero selecionado**

![image](https://github.com/Compass-pb-aws-2023-IFSP-IFGOIANO/sprint-2-pb-aws-ifsp-ifgoiano/assets/124719932/335a0ab4-690f-4192-b3b7-1f0150aed9d8)

**🔎 Página dos artistas em destaque do gênero selecionado**

![image](https://github.com/Compass-pb-aws-2023-IFSP-IFGOIANO/sprint-2-pb-aws-ifsp-ifgoiano/assets/124719932/536a80ab-5832-49ad-8361-0caf7aafafe8)

## Licença de Uso
- Livre para replicação, reprodução e melhorias.
## 👨‍💻 Desenvolvedores
Ana Giampiedro | Caua Olivio | Johnathan Borba | Roberto Molina
