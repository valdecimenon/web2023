document.addEventListener('DOMContentLoaded', () => {

    // lê o valor do parâmetro id a partir da url
    // Exemplo: http://localhost:5500/alterar.html?id=2
    const urlParams = new URLSearchParams(window.location.search)  // id=2
    const id = urlParams.get('id')

    // solicita ao servidor o produto com id=2
    fetch('http://localhost:3000/produtos/' + id)

    // converte a resposta em formato json
    .then(res => res.json())

    // processa os dados da resposta json
    .then(data => {
        if (data.length > 0){
            const produto = data[0]
            preencher_formulario(produto)
        } else 
            alerta_erro(`Erro: nenhum produto encontrado com id=${id}`)
    
    // captura erro se houver
    }).catch(erro => alerta_erro(`Erro ao buscar produto com id=${id}. \nErro: ${erro}`))

})


// função para preencher os dados do formulário
const preencher_formulario = (p) => {
    setById('id', p.id)
    setById('descricao', p.descricao)
    setById('categoria', p.categoria)
    setById('preco', p.preco.toString().replace('.', ','))
    setById('quantidade', p.quantidade)
    setById('url', p.url)
}

// funções auxiliares
const setById = (campo, valor) => {
    document.getElementById(campo).value = valor
}

const getById = (campo) => {
    return document.getElementById(campo).value
}

// função que envia os dados do formulário via método PUT para atualizar
const atualizar = () => {

    if (!validar_formulario())
        return

    const dados = {
        id : getById('id'),
        descricao : getById('descricao'),
        categoria : parseInt(getById('categoria')),
        preco : parseFloat(getById('preco').replace(',', '.')),
        quantidade : parseInt(getById('quantidade')),
        url : getById('url')
    }

    fetch('http://localhost:3000/produtos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)  // converte json em string

    // converte a resposta do servidor em objeto json
    }).then(res => res.json()

    // pega o objeto json retornado pelo servidor
    ).then(data => {
        console.log('Retorno do servidor:\n', data)

    // volta para a página de gerenciamento
    }).then(() => {
        location.href = 'gerenciador.html'

    // caso ocorra erro
    }).catch(erro => alerta_erro(`Erro ao atualizar produto: ${erro }`))


}