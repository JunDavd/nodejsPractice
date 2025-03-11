'use strict'

function escribeTrasDosSegundos(texto,n, callback){
    for(let i = 0; i < n; i++){
        setTimeout(function() {
            console.log(`${texto} ${i + 1}`)
            callback()
        }, 2000 * (i + 1))
    }
}

// escribeTrasDosSegundos('texto', function(){
//     escribeTrasDosSegundos('texto2', function(){
//         console.log('fin')
//     })
// })

///////hacer ejercicio para que texto2, se repita n veces con el mismo
////tiempo de 2 segundos de intervalo
function callSeparation(){
    console.log('----------------')
}

escribeTrasDosSegundos('texto',20, callSeparation)


