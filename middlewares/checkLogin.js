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
        if(user) {
            if(user.password === value.password) {
                user.LoggedIn = true
                users.forEach((u) => {
                    if(u.id === user.id) {
                        u.LoggedIn = true
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