'use strict'

const ingredientes = ['sal', 'pimienta','arroz','conejo','gambas']

function echar(ingrediente){
    return new Promise((resolve) => {
        console.log('echo', ingrediente)
        resolve(ingrediente)
    })
}

const result = ingredientes.map(i => echar(i))

console.log(result)

Promise.all(result.then(resultado => {
    console.log('he terminado con:', resultado)
}))