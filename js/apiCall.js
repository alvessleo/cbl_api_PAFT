const categoria = document.querySelectorAll(".category");

function callNoticias(categoria){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        let noticias = document.querySelector(".see-more");
        let resposta = JSON.parse(this.response);

        resposta.data.forEach(element => {
        let noticia = element;
        noticias.innerHTML += `
                <hr>
                <div class="news">
                    <img src="${noticia.imageUrl}">
                    <div class="typo">
                        <h3 id="nome-noticia">${noticia.title}</h3>
                        <p  class="description" maxlength="80">${noticia.content}<span>...</span></p>
                        <p>Published by <span id="nome-autor">${noticia.author}</span></p>
                        <p class="time">${noticia.date} ${noticia.time}</p>
                    </div>
                </div>
        `;
        }); 
    }
    xhttp.open("GET", `https://inshorts.deta.dev/news?category=${categoria}`);
    xhttp.send();
}


categoria.forEach(element => {
    element.onclick = function(e){
        let nome = element.name;
        callNoticias(nome);
    }
});

