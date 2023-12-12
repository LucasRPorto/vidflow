const containerVideos = document.querySelector(".videos__container");
const checkboxContainer = document.querySelector(".cabecalho__switch-input");
const contextoTipo = document.querySelectorAll(".superior__item");
const pesquisarBtn = document.querySelector(".pesquisar__btn");

const musicaClick = new Audio('./audio/swoosh.mp3');

async function buscaVideo(parametro = ""){
  const api = await fetch(`http://localhost:3000/videos/${parametro}`);
  const conexaoConvertida = await api.json();

  console.log(conexaoConvertida)
  return conexaoConvertida;
}

async function listaVideos( parametro=""){

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

listaVideos();

pesquisarBtn.addEventListener('click', (evento) => {

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