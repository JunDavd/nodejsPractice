import express from 'express'

const app = express()


app.get('/', (req,res,next) => {
    res.send('hola')
})

export default app