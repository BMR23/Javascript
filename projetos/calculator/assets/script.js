// Esboço
var display = document.getElementById('display');
var subDisplay = document.getElementById('subDisplay');
var contagemConclusao = 0;
var numOperador = 0;

/* function preCalculo(num){
    if (num == 0){
        if (display.textContent != ''){
            preResultado = calcular()
            displayTeste = document.getElementById('testeCalculadora')
            displayTeste.textContent = preResultado
        }
    }
    else{
        return
    }
} */

function inserirDigito(digito){
    console.log(digito);
    var display = document.getElementById('display');
    numOperador = 0;
    //preCalculo(numOperador)


    function remover(){
        let text = display.textContent
        let text2 = text.substring(0, text.length - 1)
        display.innerHTML = text2
    }

    
    if(digito == 'remove'){
        remover()
        return 0
    }
    else if(digito.length != 1){
        return 0
    }
    else{
        numOperador = 0
        if(contagemConclusao != 0){
            display.textContent = ''
        }
        let text = display.textContent
        let virgula = text.includes(',')
        contagemConclusao = 0

        if (virgula == false){
            display.innerHTML += digito
            //numOperador--
        }else if (digito != ','){
            display.innerHTML += digito
            //numOperador--
        }
    }

}



function inserirOperador(operador){
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');

    if (operador == 'finalizar'){
        return
    }else if(operador.length != 1){
        return 0
    }
    contagemConclusao = 0

    function limpar(){
        display.innerHTML = ""
        subDisplay.innerHTML = ""
    }
    /* function remover(){
        let text = display.textContent
        let text2 = text.substring(0, text.length - 2)
        display.innerHTML = text2
    } */
    
    if(operador == 'C'){
        limpar()
        return 0 
    }
    /* else if(numOperador != 0){
        let text = display.textContent
        text = text.replace(" ", '')
        let text2 = text.substring(0, text.length - 1)
        if (text2)
        //display.innerHTML += operador
        //display.innerHTML = operador
        return 0
    } */

    else{
        let lastLetterDisplay = display.textContent.slice(-1)
        let condicao1 = lastLetterDisplay != '+' && lastLetterDisplay != '-'
        let condicao2 = lastLetterDisplay != 'x' && lastLetterDisplay != '/'
        let condicao3 = lastLetterDisplay != '÷' && lastLetterDisplay != '%'
        
        if (condicao1 && condicao2 && condicao3){
            numOperador = 1
            display.innerHTML += operador
                //numOperador++
    
        }
    }
} 

function separaString(text){
    let lista = []
    let ind = 0
    console.log("Função separaString:")

    for (t of text){
        text = text.replace('%', '/100');
        text = text.replace('x', '*')
        text = text.replace('÷', '/')
    }
    console.log('text depois')
    console.log(text)

    while(ind < text.length){
        if (isNaN(text[ind])){
            sub0 = text.substring(0,ind)
            op = text[ind]
            lista.push(sub0, op)
            text = text.substring(ind+1)
            ind = 0
            continue
        }
        else{
            if (!(isNaN(text))){
                // Se o que sobrou do texto for numérico
                if (isNaN(lista[lista. length - 1])){
                    // Se o último item da lista não for numérico,
                    // portanto, operador
                    lista.push(text)
                }}
            ind++
            continue
        }
/*
case '√':
if(!(isNaN(ind-1))){
    lista.push('*')
}
let indZ = ind + 1
for (indZ; indZ < text.length; indZ++){
    if(!(isNaN(text[indZ])) || indZ == '.'){
        sub0 += text[indZ]
        //alert(text[indZ])
    }
    else{ break }
    }
sub0 = 
num = parseFloat(sub0)
resul = Math.sqrt(num)
//alert(indZ)
resul = resul + ''
lista.push(resul)
text = text.substring(indZ-1)
continue

*/
    }
    /* alert('lista depois:')
    alert(lista) */
    return lista
}

function calcular(){
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');
    let text = display.textContent;

    /* if (subDisplay.textContent == 0){
        subDisplay.innerHTML = text
    }else {
        subDisplay.innerHTML += `<br>${text}`
    } */


    text = text.replace(',', '.')
    console.log('text antes do separaString')
    console.log(text)
    let lista = separaString(text)
   
    if (lista[0] == ''){
        console.log('Entendeu que há um operador no início')
        nadaQuePreste = lista.shift()
    }
    if(isNaN(lista[lista.length-1]) || lista[lista.length-1] == ' '){
        console.log("Entendeu que o último não é digito")
        lista.pop()
    }
    console.log('Passou das verificações:')
    console.log(lista)
    let calc = 0
    let contador = 0
    if (lista.length >= 3 ){
        while(contador === 0) {

            if(lista.includes('*') && lista.includes('/')){
                let indexMult = lista.indexOf('*')
                let indexDivid = lista.indexOf('/')

                if (indexMult < indexDivid){
                    x = lista.indexOf('*')
                    num1 = parseFloat(lista[x-1])
                    num2 = parseFloat(lista[x+1])
                    calc = num1 * num2
                    lista[x] = calc
                    lista.splice(x-1, 1)
                    lista.splice(x, 1)
                    continue
                }
                else if (indexMult > indexDivid){
                    x = lista.indexOf('/')
                    num1 = parseFloat(lista[x-1])
                    num2 = parseFloat(lista[x+1])
                    calc = num1 / num2
                    lista[x] = calc
                    lista.splice(x-1, 1)
                    lista.splice(x, 1)
                    continue
                }
            }

            else if (lista.includes('*')){
                x = lista.indexOf('*')
                num1 = parseFloat(lista[x-1])
                num2 = parseFloat(lista[x+1])
                calc = num1 * num2
                lista[x] = calc
                lista.splice(x-1, 1)
                lista.splice(x, 1)
                continue
            }
            else if (lista.includes('/')){
                x = lista.indexOf('/')
                num1 = parseFloat(lista[x-1])
                num2 = parseFloat(lista[x+1])
                calc = num1 / num2
                lista[x] = calc
                lista.splice(x-1, 1)
                lista.splice(x, 1)
                continue
            }

            else if(lista.includes('+') && lista.includes('-')){
                let indexSoma = lista.indexOf('+')
                let indexSubt = lista.indexOf('-')

                if (indexSoma < indexSubt){
                    x = lista.indexOf('+')
                    num1 = parseFloat(lista[x-1])
                    num2 = parseFloat(lista[x+1])
                    calc = num1 + num2
                    lista[x] = calc
                    lista.splice(x-1, 1)
                    lista.splice(x, 1)
                    continue
                }
                else if (indexSoma > indexSubt){
                    x = lista.indexOf('-')
                    num1 = parseFloat(lista[x-1])
                    num2 = parseFloat(lista[x+1])
                    calc = num1 - num2
                    lista[x] = calc
                    lista.splice(x-1, 1)
                    lista.splice(x, 1)
                    continue
                }
            }

            else if (lista.includes('+')){
                x = lista.indexOf('+')
                num1 = parseFloat(lista[x-1])
                num2 = parseFloat(lista[x+1])
                calc = num1 + num2
                lista[x] = calc
                lista.splice(x-1, 1)
                lista.splice(x, 1)
                continue
            }
            else if (lista.includes('-')){
                x = lista.indexOf('-')
                num1 = parseFloat(lista[x-1])
                num2 = parseFloat(lista[x+1])
                calc = num1 - num2
                lista[x] = calc
                lista.splice(x-1, 1)
                lista.splice(x, 1)
                continue
            }
            else{
                contador = 1
                calc = calc + ''
                calc = calc.replace('.',',')
                display.innerHTML = calc //
                contagemConclusao++ //
            }
        }
        subDisplay.innerHTML += `<p> ${text} </p>`
    } 
    else{
        console.log('Só apareço com lista pequena (menor que 3)')
        console.log(lista)
        //display.innerHTML = text
    }

}



function seCliclar(){
    const digitos = document.getElementById('digitos');
    digitos.addEventListener("click", (digito)=>{
        inserirDigito(digito.target.id)
    });
    
    const operadores = document.getElementById('operadoresL');
    operadores.addEventListener("click", (operador)=>{
        inserirOperador(operador.target.id)
    });
    const operadores2 = document.getElementById('operadoresC');
    operadores2.addEventListener("click", (operador)=>{
        inserirOperador(operador.target.id)
    });

    const finalizar = document.getElementById('finalizar');
    finalizar.addEventListener('click', calcular);

}

function load(){
    seCliclar();
}
    
document.addEventListener("DOMContentLoaded", load, false);




