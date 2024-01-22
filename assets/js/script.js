document.addEventListener('DOMContentLoaded', () => {

    // lê o valor do parâmetro categoria a partir da url
    // Exemplo: http://localhost:5500/index?categoria=0 
    const urlParams = new URLSearchParams(window.location.search)
    const categoria = urlParams.get('categoria')   // 0, 1 ou 2
    let url

    if (categoria == null)
        url = 'http://localhost:3000/produtos'
    else
        url = 'http://localhost:3000/produtos/categoria/' + categoria

    // solicita ao servidor a lista de todos os produtos ou por categoria
    fetch(url)

    // converte a resposta em formato json
    .then(res => res.json())

    // processa os dados recebidos
    .then(data => {
        if (data.length == 0)
            alerta_erro('Nenhum produto encontrado no banco de dados')
        else
            criarGaleriaProdutos(data)

    // captura erro se ocorrer
    }).catch(() => alerta_erro('Erro ao consultar produtos no banco de dados'))

})

const criarGaleriaProdutos = (dados) => {
    const galeria = document.getElementById('galeria')

    dados.forEach(p => {
        let url = p.url.toLowerCase()
        if (url.substring(0,4) != 'http'){
            url = 'galeria/' + url
        }

        const preco = p.preco.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})

        galeria.innerHTML += 
            `<div class="col">` + 
                `<div class="card mb-4" style="width: 18rem;">` +
                    `<img src=${url} alt="Foto do Produto" class="card-img-top">` +
                    `<div class="card-body text-center">` +
                        `<h5 class="card-title">${p.descricao}</h5>` +
                        `<h6 class="card-subtitle mb-2 text-muted">${preco}</h6>` +
                        `<p class="card-text">Restam:${p.quantidade}</p>` +
                        `<p class="card-text">Cód: ${p.id}</p>` +
                        `<a href="#" class="btn btn-primary">Comprar</a>` +
                    `</div>` +
                `</div>` +
            `</div>`


    })
}