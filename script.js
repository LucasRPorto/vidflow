const containerVideos = document.querySelector(".videos__container");
const checkboxContainer = document.querySelector(".cabecalho__switch-input");
const contextoTipo = document.querySelectorAll(".superior__item");
const pesquisarBtn = document.querySelector(".pesquisar__btn");
const logoItem = document.querySelector(".logo__item");
const inicioMenu = document.querySelector(".menu__itens");
const itemMenuSuperior = document.querySelectorAll(".superior__item");
const cadastroVideoBtn = document.querySelector(".cabecalho__videos");

const musicaClick = new Audio('./audio/swoosh.mp3');

async function buscaVideo(parametro = ""){ //Requisicao GET para busca de videos do JSON
  const api = await fetch(`http://localhost:3000/videos/${parametro}`);
  const conexaoConvertida = await api.json();

  console.log(conexaoConvertida)
  return conexaoConvertida;
}

async function criaVideo(dadosFormatado){ // Requisicao POST para criação de vídeos

  await fetch(`http://localhost:3000/videos/`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "id": 19,
      "titulo": dadosFormatado.titulo,
      "descricao": dadosFormatado.descricao,
      "url": dadosFormatado.url,
      "imagem": dadosFormatado.imagem,
      "categoria": dadosFormatado.categoria
    })
  });
}

async function listaVideos( parametro=""){ // Listar os vídeos do JSON. Caso seja passado um parâmetro (opcional) será realizada a pesquisa filtrada.

  const videos = await buscaVideo(parametro);
  await videos.forEach((video) => {
    containerVideos.innerHTML += `
      <li class = "videos__item">
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class = "descricao-video">
              <img class = "img-canal" src=${video.imagem} alt = "Logo do canal">
              <h3 class = "titulo-video">${video.titulo}</h3>
              <p class = "titulo-canal">${video.descricao}</p>
          </div>
      </li>
    `
  })
}

listaVideos(); // Para listar os vídeos na primeira vez que a página é carregada

pesquisarBtn.addEventListener('click', (evento) => { // Busca por texto presente na barra de pesquisa

  while(containerVideos.firstChild){
    containerVideos.removeChild(containerVideos.firstChild);
  }
  const dataPesquisa = document.querySelector("[data-pesquisa]").value;
  evento.preventDefault();
  console.log(dataPesquisa);
  listaVideos(`?q=${dataPesquisa}`);
})

checkboxContainer.addEventListener('change', () =>{
  musicaClick.play();
}
)

logoItem.addEventListener('click', (evento) => {
  evento = listaVideos();
})

inicioMenu.addEventListener('click', (evento) => {
  evento = listaVideos();
})

itemMenuSuperior.forEach((itemDoMenu) => { // Busca por itens do Menu
  itemDoMenu.addEventListener('click', (evento) => {

    while(containerVideos.firstChild){
      containerVideos.removeChild(containerVideos.firstChild);
    }

    const nomeDoItem = itemDoMenu.getAttribute("name");
    const nomeDoItemFormatado = nomeDoItem.toString()
    evento.preventDefault();
    console.log(nomeDoItemFormatado);

    itemMenuSuperior.forEach((itemDoMenu) => {
      if(itemDoMenu.classList.contains("active")){
        itemDoMenu.classList.remove("active");
      }
    })

    itemDoMenu.classList.add("active");

    if(nomeDoItemFormatado == "Tudo"){
      listaVideos();
    }else{
    listaVideos(`?categoria=${nomeDoItemFormatado}`);
    }
  })
})

cadastroVideoBtn.addEventListener('click', () => { // Sempre quando clicar no ícone de cadastro de vídeo é chamada a requisição POST
  criaVideo(objetoDeTeste);
  listaVideos();
  console.log("Em tese é para ter listado " )
})

const objetoDeTeste= { // Utilizado apenas para testar a requisição POST
  "id": 19,
  "titulo": "dadosFormatado.titulo",
  "descricao": "dadosFormatado.descricao",
  "url": "https://www.youtube.com/embed/y8FeZMv37WU",
  "imagem": "https://github.com/MonicaHillman/aluraplay-requisicoes/blob/main/img/logo.png?raw=true",
  "categoria": "Programação"
}
