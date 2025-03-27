import session from "express-session";
import MongoStore from "connect-mongo";

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

//middleware para gestionar sesiones
export const middleware = session({
    name: 'nodeapp-session',
    secret: 'PA(Q*=hd2Yy9{@saq$EkK!x<M>B+;ZpVHScW',
    saveUninitialized: true, //crea una sesion vacia a cada usuario
    resave: false,
    cookie: {maxAge: INACTIVITY_EXPIRATION_2_DAYS},
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/cursonode'
    })
})

export function useSessionInViews(req,res,next){
        res.locals.session = req.session
        next()
}