import Agent from "../models/Agent.js"

export function index(req,res,next){
    res.render('new-agent')
}

export async function postNew(req,res,next){
    try {
        const { name,age } = req.body
        const userId = req.session.userId
        //validaciones

        //creo una instancia de agente en memoria
        const agent = new Agent({name, age, owner:userId})

        //lo guardo en base de datos
        await agent.save()

        res.redirect('/')
    } catch (error) {
        next(error)
    }
}