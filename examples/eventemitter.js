'use strict'

const EventEmitter = require('node:events')

const emiter = new EventEmitter()

emiter.on('llamada de telefono', (payload) => {
    if (payload.llamante === 'hermana'){
        return
    }
    console.log('ring ring')
})

emiter.once('llamada de telefono', () => {
    console.log('brr brr brr')
})

emiter.emit('llamada de telefono', {llamante: 'hermana'})
emiter.emit('llamada de telefono',{llamante: 'hermana'})
emiter.emit('llamada de telefono',{llamante: 'hermana'})