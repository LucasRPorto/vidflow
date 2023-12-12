const containerVideos = document.querySelector(".videos__container");
const menuContainer = document.querySelector(".superior__secao__container-wrapper");
const checkboxContainer = document.querySelector(".cabecalho__switch-input");

const musicaClick = new Audio('./audio/swoosh.mp3');

const api = fetch("http://localhost:3000/videos")
.then(res => res.json())
.then((videos) => 
    videos.forEach((video) => {
      containerVideos.innerHTML += `
        <li class = "videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class = "descricao-video">
                <img class = "img-canal" src=${video.imagem} alt = "Logo do canal">
                <h3 class = "titulo-video">${video.titulo}</h3>
                <p class = "titulo-canal">${video.descricao}</p>
            </div>
        </li>
      `;
    })
)

checkboxContainer.addEventListener('change', () =>{
  musicaClick.play();
}
)