const categoria = document.querySelectorAll(".category");

function callNoticias(categoria){
    let principal = document.querySelector(".main .image");
    let noticias = document.querySelector(".see-more");
    loading(principal, noticias);

    noticias.innerHTML = "<h3></h3>";

    axios.interceptors.response.use(function (response) {
        console.log("Dados coletados: ", response)
    })
    axios.get(`https://inshorts.deta.dev/news?category=${categoria}`)
    .then(response => {
        let resposta = response;
        resposta.data.data.forEach((element, index) => {
            let noticia = element;
            if (index == 0){
                principal.innerHTML = `
                <a href="${noticia.url}"  target="_blank">
                    <div class="image">
                        <img src="${noticia.imageUrl}" alt="imagem">
                        <div class="typo">
                            <div class="tag-novo">${resposta.category}</div>
                            <h2 id="nome-noticia">${noticia.title}</h2>
                            <p>Published by <span id="nome-autor">${noticia.author}</span></p>
                        </div>
                    </div>
                </a>
                `;
            } else{
                noticias.innerHTML += `
                <div class="news">
                    <img src="${noticia.imageUrl}">
                    <div class="typo">
                        <h3 id="nome-noticia">${noticia.title}</h3>
                        <p  class="description">${noticia.content}<span>... <a href="${noticia.url}" class="read-more"  target="_blank">Read more</a></span></p>
                        <p>Published by <span id="nome-autor">${noticia.author}</span></p>
                        <p class="time">${noticia.date} ${noticia.time}</p>
                    </div>
                </div>
                <hr>`;
            }
            }); 
    })
    // const xhttp = new XMLHttpRequest();
    // xhttp.onload = function (){
    //     let resposta = JSON.parse(this.response);
    //     resposta.data.forEach((element, index) => {
    //     let noticia = element;
    //     if (index == 0){
    //         principal.innerHTML = `
    //         <a href="${noticia.url}"  target="_blank">
    //             <div class="image">
    //                 <img src="${noticia.imageUrl}" alt="imagem">
    //                 <div class="typo">
    //                     <div class="tag-novo">${resposta.category}</div>
    //                     <h2 id="nome-noticia">${noticia.title}</h2>
    //                     <p>Published by <span id="nome-autor">${noticia.author}</span></p>
    //                 </div>
    //             </div>
    //         </a>
    //         `;
    //     } else{
    //         noticias.innerHTML += `
    //         <div class="news">
    //             <img src="${noticia.imageUrl}">
    //             <div class="typo">
    //                 <h3 id="nome-noticia">${noticia.title}</h3>
    //                 <p  class="description">${noticia.content}<span>... <a href="${noticia.url}" class="read-more"  target="_blank">Read more</a></span></p>
    //                 <p>Published by <span id="nome-autor">${noticia.author}</span></p>
    //                 <p class="time">${noticia.date} ${noticia.time}</p>
    //             </div>
    //         </div>
    //         <hr>`;
    //     }
    //     }); 
    // }
    // xhttp.open("GET", `https://inshorts.deta.dev/news?category=${categoria}`);
    // xhttp.send();
}

function loading(principal, noticias){
    principal.innerHTML = `<div class="principal-loader">
    <img src="assets/Magnify-1.2s-201px.gif"></img>
    </div>`;
    noticias.innerHTML += `<div class="noticias-loader"></div>`;
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