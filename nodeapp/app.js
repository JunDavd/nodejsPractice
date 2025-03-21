import path from 'node:path'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import * as homeController from './controlers/homeController.js'
import { error } from 'node:console'

const app = express()

app.set('views','views') // views folder 
app.set('view engine', 'html')
app.engine('html', (await import ('ejs')).__express)

app.locals.appName = 'NodeApp'

// app.use((req,res,next) => {
//     console.log('Llega petición de tipo', req.method, 'a', req.url)
//     next()
// })

/**
 * Rutas generales
 */
app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(import.meta.dirname,'public')))


/**
 * Application rutes
 */

/**
 * abajo la mayoria son rutas diferentes por lo
 * que no es necesario poner next a cada una
 * solo se pone next() cuando son multiples middlewares en una misma
 * ruta. por ejemplo  esto en homecontroller.validateParamInquery debe ir 
 * next() para poder pasar a paramInQuery, si no, no se ejecuta
 *
 */
app.get('/',homeController.index)
app.get('/param_in_route/:num?', homeController.paranInRoute)
app.get('/param_in_route_multiple/:product/size/:size([0-9]+)/color/:color', homeController.paranInRouteMultiple)
app.get('/param_in_query',homeController.validateParamInQueryQuery, homeController.paramInQuery)
app.post('/post_with_body', homeController.postWithBody)
//catch 404 and send error
app.use((req,res,next) => {
    // res.send('no encuentro lo que me pides')
    // const error = new Error ('no encuentro lo que me pides')
    // error.status = 404
    next(createError(404))
})

//error handler
app.use((err,req,res,next) => {
    //manage validation errors
    if (err.array){
        err.message = 'Invalid reques:' + err.arr()
        .map(e => `${e.location} ${e.type} ${e.path} ${e.msg}`)
        .join(', ')
        err.status = 422
    }
    res.status(err.status || 500)
    // res.send('Ocurrio un error: ' + err.message) 

    //set locals, including error informartion in development 
    res.locals.message = err.message
    res.locals.error = process.env.NODEAPP_ENV === 'develompment' ? err : {}
    res.render('error')
})
export default app