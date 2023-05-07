var display = document.getElementById('display');
var subDisplay = document.getElementById('subDisplay');
var listaOperadores = ['+', '-', '*', 'x', '/', '÷', '√', '%', '^', '.', ',']
var contagemConclusao = 0;
var numOperador = 0;
var numOperadorEspecial = 0;


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


function inserirDigito(digito){
    console.log(digito);
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');
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
        subDisplay.innerHTML = `<p></p>`;
        display.innerHTML = "";
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
    
    let listaOperadoresNormais = ['+', '-']
    let lastLetterDisplay = display.textContent.slice(-1)
    lastLetterDisplay = lastLetterDisplay.replace(' ', '')
    
    if (listaOperadores.includes(operador)){
        if (! (listaOperadores.includes(lastLetterDisplay) ) && lastLetterDisplay == ''){
            if ( listaOperadoresNormais.includes(operador) ){
                contagemConclusao = 0;
                numOperador = 1;
                display.innerHTML += `${operador}`;
            }
            else{ return;}
        }
        else if (!(listaOperadores.includes(lastLetterDisplay)) && !(lastLetterDisplay == '')){
            contagemConclusao = 0;
            numOperador = 1;
            display.innerHTML += `${operador}`;
        }
    }
    else if(operador == 'C'){
        subDisplay.innerHTML = `<p></p>`;
        display.innerHTML = "";
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

    

function preparaString(text){
    for (t of text){
        if (listaOperadores.includes(t)){
            text = text.replace(t, ` ${t} `)
        }
        text = text.replace('%', ' / 100');
        text = text.replace('x', ' * ');
        text = text.replace('÷', ' / ');
        text = text.replace(',', '.');
    }
    let lista = text.split(' ')

    if (lista[0] == ''){
        lista.shift()
    }
    console.log(lista[lista.length-1])
    /* for( i in lista){
        if (lista[i] === ' '){
            lista.splice(i-1)
        }
    } */
    if(isNaN(lista[lista.length-1]) || lista[lista.length-1] == ''){
        lista.pop()
    console.log(lista)
    return lista
    }
}

function calcular(){
    var display = document.getElementById('display');
    var subDisplay = document.getElementById('subDisplay');
    let text = display.textContent;
    let lista = preparaString(text)
    let calc = 0
    let contador = 0

    const auxCalc = function(lista, operador){
        x = lista.indexOf(operador)
        num1 = parseFloat(lista[x-1])
        num2 = parseFloat(lista[x+1])
        switch (operador){
            case '^':
                calc = num1 ** num2
                break
            case '*':
                calc = num1 * num2
                break
            case '/':
                calc = num1 / num2
                break
            case '+':
                calc = num1 + num2
                break
            case '-':
                calc = num1 - num2
                break
        }
        lista[x] = calc
        lista.splice(x-1, 1)
        lista.splice(x, 1)
    }

    if (lista.length >= 3 ){
        while(contador === 0) {

            if(lista.includes('^')){
                auxCalc(lista, '^')
                continue
            }
            //
            else if(lista.includes('*') && lista.includes('/')){
                let indexMult = lista.indexOf('*')
                let indexDivid = lista.indexOf('/')

                if (indexMult < indexDivid){
                    auxCalc(lista, '*')
                    continue
                }
                else if (indexMult > indexDivid){
                    auxCalc(lista, '/')
                    continue
                }
            }
            //
            else if (lista.includes('*')){
                auxCalc(lista, '*')
                continue
            }
            //
            else if (lista.includes('/')){
                auxCalc(lista, '/')
                continue
            }
            //
            else if(lista.includes('+') && lista.includes('-')){
                let indexSoma = lista.indexOf('+')
                let indexSubt = lista.indexOf('-')
                
                if (indexSoma == 0){
                    lista.shift()
                    continue
                }
                else if(indexSubt == 0){
                    lista.shift()
                    num = parseFloat(lista[0])
                    lista[0] = num * -1
                    console.log(lista[0])
                    continue
                }
                if (indexSoma < indexSubt){
                    auxCalc(lista, '+')
                    continue
                }
                else if (indexSoma > indexSubt){
                    auxCalc(lista, '-')
                    continue
                }
            }
            //
            else if (lista.includes('+')){
                auxCalc(lista, '+')
                continue
            }
            //
            else if (lista.includes('-')){
                auxCalc(lista, '-')
                continue
            }
            //
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
}

/* function load(){
    seCliclar();
}
    
document.addEventListener("DOMContentLoaded", load, false); */




