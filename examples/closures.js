'use strict'

function createVehiculo(nombre){
    const numeroRuedas = 4
    return{
        saluda: function(){console.log('hola soy', nombre,'tengo',numeroRuedas,'ruedas')},
        ponRuedas: function(valor){numeroRuedas = valor}

    }
}

const coche = createVehiculo('seat')

coche.ponRuedas(8)

// coche.saluda()

setTimeout(coche.saluda,2000) ///esto funciona y no eh tenido que usar arrows function



