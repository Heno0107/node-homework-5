const { schema } = require("../schema/registerSchema")

const bodyChange = (req , res , next) => {
    try {
        const { value , error} = schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                error : error.details
            })
        }
        const { name , age , email , password , role} = value
        const { users } = res.locals
        let filteredName = name.toLowerCase().split('')
        filteredName[0] = filteredName[0].toUpperCase()
        filteredName = filteredName.join('')
        res.locals.body = {
            id : (Number(users.at(-1).id) + 1).toString() ,
            name : filteredName ,
            age ,
            email ,
            password ,
            loggedIn : false ,
            role : role.toLowerCase()
        }
        next()
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    bodyChange
}