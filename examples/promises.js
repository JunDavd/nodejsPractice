'use strict'

//una funcion que devuelve una promesa

function sleep(ms){
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(42)
        }, ms)
    })
}

const promesa = sleep(2000)

// const result = await sleep(2000)/////aqui entonces se guarda el resolve(42)

promesa.then((result) => {
    console.log('ha pasado un segundo', result)
    // return sleep(2000)
    // throw new Error('fataaal')
    return result + 20
}).catch(err => {
    console.log('gestiono el error del primer sleep')
})
.then(() => {
    console.log('sigo con resultado', result)
    return sleep(2000)
}).then(() => {
    console.log('sigo mas')
    return sleep(2000)
}).catch(err => {
    console.log('hubo algun error', err.message)
})