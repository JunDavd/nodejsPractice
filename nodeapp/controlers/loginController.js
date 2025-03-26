import User from "../models/User.js"

export function index(req,res,next){
    res.locals.error = ''
    res.locals.email = ''
    res.render('login')
}

export async function postLogin(req,res,next){
    try {
        const {email, password} = req.body
        console.log(email, password)
    
        //buscar usuario en la base de datos
        const user = await User.findOne({email: email})
    
        //si no lo encuentro, o la contraseña no coincide--> error
        if(!user || !(await user.comparePassword(password))){
            res.locals.error = 'Invalid credentials'
            res.locals.email = email
            res.render('login')
            return 
        }
    
        //si el usuaro existe y la contraseña es buena--> redirect a la home
        res.redirect('/')
        
    } catch (error) {
        next(error)
    }
}