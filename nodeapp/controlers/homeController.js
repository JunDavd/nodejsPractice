import { query, validationResult } from "express-validator"
import Agent from "../models/Agent.js"

export async function index (req,res,next){

    res.locals.users = await Agent.find()

    const now = new Date()
    res.locals.esPar = (now.getSeconds() % 2) === 0
    res.locals.segundoActual = now.getSeconds()

    res.locals.codigo = '<script>alert("inyectado!!!")</script>'
    res.render('home')
}

// /param_in_route/45
export function paramInRoute(req, res, next) {
    const num = req.params.num
  
    res.send('me has pasado ' + num)
  }
  
  // /param_in_route_multiple/pantalon/size/M/color/blue
  export function paramInRouteMultiple(req, res, next) {
    const product = req.params.product
    const size = req.params.size
    const color = req.params.color
  
    res.send(`quieres un ${product} de talla ${size} y color ${color}`)
  }

  
  export const validateParamInQuery = [
    query('color')
    .custom(value => {
      return ['red','blue'].includes(value)
    })
    // .notEmpty()
    .withMessage('must be red or blue'),
    query('talla')
    .isNumeric()
    .withMessage('must be numeric')
  ]
  // /param rojo
  export function paramInQuery(req,res,next){
    validationResult(req).throw()

    const color = req.query.color

    console.log(req.query)

    res.send(`el color es ${color}`)
  }

 
  //posst with body

  export function postWithBody(req,res,next){
    // const age = req.body.age
    // const color = req.body.color

    const { age, color} = req.body

    res.send('ok')
  }


