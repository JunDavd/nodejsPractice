
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
