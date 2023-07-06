lista = ['2','x','100','/','2','x','4']

let calc = 0
let contador = 0


if (lista.length >= 3 ){
    while(contador < 8) {
        contador++
        let temMult = lista.includes('x')
        let temDivi = lista.includes('/')
        let temSoma = lista.indexOf('+')
        let temSubt = lista.indexOf('-')


        //let temSoma = lista.includes('+')
        //let temSubt = lista.includes('-')

        if (temMult){
            let indexMult = lista.indexOf('x')
            if (temDivi){
                let indexDivid = lista.indexOf('/')

                    if (indexDivid < indexMult){
                        console.log('prioridade do /')
                        x = indexDivid
                        num1 = parseFloat(lista[x-1])
                        num2 = parseFloat(lista[x+1])
                        calc = num1 / num2
                        lista[x] = calc
                        lista.splice(x-1, 1)
                        lista.splice(x, 1)
                        continue
                    }
                
            }
            console.log('prioridade do x')
            x = indexMult
            num1 = parseFloat(lista[x-1])
            num2 = parseFloat(lista[x+1])
            calc = num1 * num2
            lista[x] = calc
            lista.splice(x-1, 1)
            lista.splice(x, 1)
            continue
        }
        else if (temDivi){
            if (temMult){
                console.log('Decidir prioridade entre "x" e "/"')
                console.log(`x: ${indexMult}`)
                console.log(`/: ${indexDivid}`)

                    if (indexMult < indexDivid){
                        console.log('prioridade do x')
                        x = indexMult
                        num1 = parseFloat(lista[x-1])
                        num2 = parseFloat(lista[x+1])
                        calc = num1 * num2
                        lista[x] = calc
                        lista.splice(x-1, 1)
                        lista.splice(x, 1)
                        continue
                    }
                continue                    
                }
            
            console.log('prioridade do /')
            x = indexDivid
            num1 = parseFloat(lista[x-1])
            num2 = parseFloat(lista[x+1])
            calc = num1 / num2
            lista[x] = calc
            lista.splice(x-1, 1)
            lista.splice(x, 1)
            continue
            }
        
        else if (temSoma){
            x = lista.indexOf('+')
            num1 = parseFloat(lista[x-1])
            num2 = parseFloat(lista[x+1])
            calc = num1 + num2
            lista[x] = calc
            lista.splice(x-1, 1)
            lista.splice(x, 1)
            continue
        }
        else if (temSubt){
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
            console.log(calc)
            //display.innerHTML = calc //
            contagemConclusao++ //
        }
    }
    //subDisplay.innerHTML += `<p> ${text} </p>`
} 