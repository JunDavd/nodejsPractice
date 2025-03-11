'use strict';



// crear una funcion para usarla como un constructor de objeto

function Fruta(nombre){
    this.nombre = nombre
    this.saluda = function(){console.log('hola,soy', this.nombre)}
}

const limon = new Fruta('limon')

console.log(limon)

limon.saluda()