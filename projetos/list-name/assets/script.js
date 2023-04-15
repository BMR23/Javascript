let nomes = [
    "Jamilton",
    "Breno",
    "Allan",
    "Guilherme",
    "Andre",
    "Ana",
    "Wesley",
    "Hugo",
    "Carlos",
    "Jamilton",
]

function CarregarNomes(){

    let lista_itens = [];

    for (let name of nomes){
    novo_item = `
    <li class="list-group-item">
    ${name}
    </li>
    `;
    lista_itens += novo_item;
    }
    document.getElementById('lista').innerHTML = lista_itens
}


function PesquisarNomes(){

    let Nome = document.getElementById('campoNome').value;
    let lista_itens = [];

    for ( let x of nomes){
        if (Nome == x){
            lista_itens += `
            <li class="list-group-item">
            ${Nome}
            </li>
            `;
        }
        continue
    }
    if (lista_itens == 0){
        document.getElementById('lista').innerHTML = `<li class="list-group-item">Sem resultado de pesquisa
        </li>`
    }
    else{
        document.getElementById('lista').innerHTML = lista_itens
        
    }
}
