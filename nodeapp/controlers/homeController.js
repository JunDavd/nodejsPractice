import { query, validationResult } from "express-validator"
import Agent from "../models/Agent.js"

export async function index (req,res,next){
  try {
    
    const userId = req.session.userId
    //filters
    const filterName = req.query.name
    const filterAge = req.query.age
//paginations
    const limit = req.query.limit
    const skip = req.query.skip

    //sorting
    const sort = req.query.sort

    const filter = {
      owner: userId
    }

    if(filterName){
      filter.name = filterName
    }

    if(filterAge){
      FileReader.age = filterAge
    }
    
    res.locals.agents = await Agent.list(filter,limit,skip,sort)
  
    const now = new Date()
    res.locals.esPar = (now.getSeconds() % 2) === 0
    res.locals.segundoActual = now.getSeconds()
  
    res.locals.codigo = `<script>alert("${res.__('injected')}!!!")</script>`
    res.render('home')
    
  } catch (error) {
    next(error)
  }

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


