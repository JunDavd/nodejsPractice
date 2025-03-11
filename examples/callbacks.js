'use strict'

function suma(a,b, callback){
    return a + b
    callback(resultado)
}

suma(3,6, function(resultado){
    console.log('terminado con resultado', resultado)
})
