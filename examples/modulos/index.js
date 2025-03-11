const modulo = require('./modulo')

const moduloES = require('./modulo-es.mjs')

console.log(modulo.suma(3,5))

//ejemplo de cargar modulos de ES
console.log(moduloES.default.suma(4,8))