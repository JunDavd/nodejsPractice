import { query, validationResult } from "express-validator"

export function index (req,res,next){

    res.locals.users = [
        {name: 'Smith', age: 45},
        {name:'Brown', age: 28},
        {name:'Jones', age: 34}
    ]
    const now = new Date()
    res.locals.esPar = (now.getSeconds() % 2) === 0
    res.locals.segundoActual = now.getSeconds()

    res.locals.codigo = '<script>alert("inyectado!!!")</script>'
    res.render('home')
}

// /param_in_route/45
export function paranInRoute(req, res, next) {
    const num = req.params.num
  
    res.send('me has pasado ' + num)
  }
  
  // /param_in_route_multiple/pantalon/size/M/color/blue
  export function paranInRouteMultiple(req, res, next) {
    const product = req.params.product
    const size = req.params.size
    const color = req.params.color
  
    res.send(`quieres un ${product} de talla ${size} y color ${color}`)
  }

  export const validateParamInQueryQuery = [
    query('color')
    // .notEmpty()
    .custom(value => value === 'blue')
    .withMessage('must be red or blue'),
    query('talla')
    .isNumeric()
    .withMessage('must be numeric')
  ]
  ///param rojo
  export function paramInQuery(req,res,next){
    validationResult(req).throw()
    const color = req.query.color
    res.send(`el color es ${color}`)
  }

  //posst with body

  export function postWithBody(req,res,next){
    // const age = req.body.age
    // const color = req.body.color

    const { age, color} = req.body

    res.send('ok')
  }