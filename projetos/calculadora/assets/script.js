// Esboço
var display = document.getElementById('display');
var subDisplay = document.getElementById('subDisplay');
var contagemConclusao = 0;
var numOperador = 0;
var numOperadorEspecial = 0;


function inserirDigito(digito){
    console.log(digito);
    var display = document.getElementById('display');
    numOperador = 0;
    numOperadorEspecial = 0;
    //preCalculo(numOperador)


    function remover(){
        let text = display.textContent;
        let text2 = text.substring(0, text.length - 1);
        display.innerHTML = text2;
    }

    
    if(digito == 'Backspace'){
        remover();
        return 0;
    }
    else if (digito == 'Enter'){
        calcular();
        return 0;
    }
    else if(digito == 'Delete'){
        display.innerHTML = "";
        subDisplay.innerHTML = "";
        return 0 ;
    }
    else if(digito.length != 1){
        return 0;
    }
    else{
        numOperador = 0;
        if(contagemConclusao != 0){
            display.textContent = '';
        }
        let text = display.textContent
        let virgula = text.includes(',');
        contagemConclusao = 0;

        if (virgula == false){
            display.innerHTML += digito;
            //numOperador--
        }else if (digito != ','){
            display.innerHTML += digito;
            //numOperador--
        }
    }

}



function inserirOperador(operador){
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');
    let operadores = ['+', '-', '*', 'x', '/', '÷', '√', '%', '^', '.', ',']
    let operadoresNormais = ['+', '-']
    let lastLetterDisplay = display.textContent.slice(-1)
    
    // Se o operador estiver incluido na lista operadores
    if (operadores.includes(operador)){
        // Se a ultima letra do display não estiver incluido na lista operadores
        if (! (operadores.includes(lastLetterDisplay) ) && lastLetterDisplay == ''){
            if ( operadoresNormais.includes(operador) ){
                contagemConclusao = 0;
                numOperador = 1;
                display.innerHTML += operador;
            }
            else{ return;}
        }
        else if (!(operadores.includes(lastLetterDisplay)) && !(lastLetterDisplay == '')){
            contagemConclusao = 0;
            numOperador = 1;
            display.innerHTML += operador;
        }
    }
    else if(operador == 'C'){
        display.innerHTML = "";
        subDisplay.innerHTML = "";
        return 0 ;
    }
    else{ return 0; }
}
/* 
    if (lastLetterDisplay == '%'){
        if(operador != '%' && operador != '√'){
            contagemConclusao = 0;
            numOperador = 1;
            display.innerHTML += operador;
        }
        else{ return; }
    else if(operador == '%'){
        if (!(isNaN(lastLetterDisplay))){
            numOperadorEspecial = 1;
            display.innerHTML += operador;
        }
        else{ return; }
    }
    else if(operador != '√'){
        if (isNaN(lastLetterDisplay)){
            numOperadorEspecial = 1;
            display.innerHTML += operador;
} */

    

function separaString(text){
    let lista = [];
    let ind = 0;

    for (t of text){
        text = text.replace('%', '/100');
        text = text.replace('x', '*');
        text = text.replace('÷', '/');
        text = text.replace(',', '.');
    }

    for(ind; ind <= text.length; ind ++){
        /* if (text[ind] == '√'){
            if(!(isNaN(ind-1)) && ind != 0){
                lista.push('*');
            }
            let indZ = ind + 1;
            for (indZ; indZ < text.length; indZ++){
                if(!(isNaN(text[indZ])) || indZ == '.'){
                    sub0 += text[indZ];
                    //alert(text[indZ])
                }
                else{ break; }
            } 
            num = parseFloat(sub0);
            resul = Math.sqrt(num);
            //alert(indZ)
            resul = resul + ''
            lista.push(resul);
            text = text.substring(indZ-1);
            continue;
        } */
        if (isNaN(text[ind])){
            if (ind == 0){
                op = text[ind];
                lista.push('0', op)
                text = text.substring(ind+1);
                ind = 0;
                continue;
            }
            sub0 = text.substring(0,ind);
            op = text[ind];
            lista.push(sub0, op);
            text = text.substring(ind+1);
            ind = 0;
            continue;
        }
        else{
            if (!(isNaN(text))){
                alert('o que sobrou do texto');
                alert(text);
                // Se o que sobrou do texto for numérico
                if (isNaN(lista[lista. length - 1])){
                    // Se o último item da lista não for numérico,
                    // portanto, operador
                    lista.push(text);
                }}
            continue
        }
    }
    return lista;
}

function calcular(){
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');
    let text = display.textContent;
    let lista = separaString(text)
    let calc = 0
    let contador = 0

    if (lista[0] == ''){
        nadaQuePreste = lista.shift()
    }
    if(isNaN(lista[lista.length-1]) || lista[lista.length-1] == ' '){
        lista.pop()
    }

    if (lista.length >= 3 ){
        while(contador === 0) {

            if(lista.includes('^')){
                x = lista.indexOf('^')
                num1 = parseFloat(lista[x-1])
                num2 = parseFloat(lista[x+1])
                calc = num1 ** num2
                lista[x] = calc
                lista.splice(x-1, 1)
                lista.splice(x, 1)
                continue
            }

            else if(lista.includes('*') && lista.includes('/')){
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


function load(){
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

    addEventListener('keydown', (event)=>{
        // verificaTeclado(event.key)
        tecla = event.key
        if(tecla.length > 4){
            inserirDigito(tecla)
        }
        else if (!(isNaN(tecla))){
            inserirDigito(tecla)
        }
        else if (isNaN(tecla)){
            inserirOperador(tecla)
        }
    })

}
    
document.addEventListener("DOMContentLoaded", load, false);




