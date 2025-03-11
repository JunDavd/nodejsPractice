'use strict'

function Persona(nombre){
    this.nombre = nombre
    // this.saluda = function(){console.log('hola soy',this.nombre)}
}

const pepe = new Persona('Pepe')
const luis = new Persona('luis')

Persona.prototype.saluda = function(){console.log('hola soy',this.nombre)}

pepe.saluda()
luis.saluda()

//Herencia simple

function Agente(nombre){
    //quiero heredar el constructor de las personas
    //como: quiero ejecutar el constructor de Persona, pero con mi "this"
    Persona.call(this, nombre) //super()
}

const smith = new Agente('Smith')

console.log(smith.nombre)

//heredar las propiedades de prototipo

Object.setPrototypeOf(Agente.prototype, Persona.prototype)

smith.saluda()

//herencia multiple


//quiero que los agentes, ademas de heredar de las personas,
//tambien hereden de superheroes 

function Superheroe(){
    this.vuela = function(){console.log(this.nombre, 'vuela')}
}

//copiar todas las propiedades de los super heroes 

Object.assign(Agente.prototype, new Superheroe())

smith.vuela()

console.log(smith)
console.log(Agente.prototype)
console.log(smith instanceof Persona)
console.log(smith instanceof Agente)