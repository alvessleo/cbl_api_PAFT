const categoria = document.querySelectorAll(".category");

function callNoticias(categoria){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){
        let principal = document.querySelector(".main .image");
        let noticias = document.querySelector(".see-more");
        let resposta = JSON.parse(this.response);

        noticias.innerHTML = "<h3>Veja mais</h3>";

        resposta.data.forEach((element, index) => {
        let noticia = element;
        if (index == 0){
            principal.innerHTML = `
                <div class="image">
                    <img src="${noticia.imageUrl}" alt="imagem">
                    <div class="typo">
                        <div class="tag-novo">${resposta.category}</div>
                        <h2 id="nome-noticia">${noticia.title}</h2>
                        <p>Published by <span id="nome-autor">${noticia.author}</span></p>
                    </div>
                </div>
            `;
        } else{
            noticias.innerHTML += `
            <div class="news">
                <img src="${noticia.imageUrl}">
                <div class="typo">
                    <h3 id="nome-noticia">${noticia.title}</h3>
                    <p  class="description" maxlength="80">${noticia.content}<span>... <a href="#" class="read-more">Read more</a></span></p>
                    <p>Published by <span id="nome-autor">${noticia.author}</span></p>
                    <p class="time">${noticia.date} ${noticia.time}</p>
                </div>
            </div>
            <hr>`;
        }
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

document.body.onload = function(e){
    callNoticias("all");
};