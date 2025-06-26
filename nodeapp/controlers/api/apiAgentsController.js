import Agent from "../../models/Agent.js"

export async function list(req, rest, next){
    try {

        //filters
        //http://localhost:3000/api/agents?name=Smith
        const filterName = req.query.name
        //http://localhost:3000/api/agents?age=33
        const filterAge = req.query.age
        //paginations
        //http://localhost:3000/api/agents?limit=2&skip=2
        const limit = req.query.limit
        const skip = req.query.skip

        //sorting
        //http://localhost:3000/api/agents?sort=name
        //http://localhost:3000/api/agents?sort=age%20name
        
        const sort = req.query.sort

        const filter = {
            // TODO implemente API authentication
            // owner: userId
        }

        if(filterName){
            filter.name = filterName
        }

        if(filterAge){
            filter.age = filterAge
        }

        const agents = await Agent.list(filter,limit,skip,sort)
        rest.json({results: agents})
    } catch (error) {
        next(error)
    }
}