const { productSchema } = require("../schema/productSchema");

const checkUser = (req , res , next) => {
    try {
        const {products , users} = res.locals
        const {value , error} = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                error : error.details
            })
        }
        const {title , price , description} = value
        const user = users.find((user) => user.loggedIn)
        if (user) {
            if (user.role === 'admin') {
                res.locals.product = {
                    id : (Number(products.at(-1).id) + 1).toString() ,
                    title ,
                    price ,
                    description ,
                    author : user.name
                }
                next()
            } else {
                res.status(400).json({
                    message : "Only admins can add a product"
                })
            }
        } else {
            res.status(400).json({
                message : "You're not logged in"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    checkUser
}