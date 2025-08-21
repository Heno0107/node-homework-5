const { loginSchema } = require("../schema/loginSchema");

const checkLogin = (req , res , next) => {
    try {
        const {users} = res.locals
        const { value , error} = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                error : error.details
            })
        }
        const user = users.find((user) => user.email === value.email)
        const loggedIn = users.find((user) => user.loggedIn)
        if (loggedIn) {
            return res.status(400).json({
                message : "You're already logged in"
            })
        }
        if(user) {
            if(user.password === value.password) {
                user.loggedIn = true
                users.forEach((u) => {
                    if(u.id === user.id) {
                        u.loggedIn = true
                    }
                })
                res.locals.user = user
                next()
            } else {
                res.status(400).json({
                    message : 'Wrong email or password'
                })
            }
        } else {
            res.status(400).json({
                message : 'Wrong email or password'
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    checkLogin
}