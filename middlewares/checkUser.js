const { patchSchema } = require("../schema/patchSchema");

const checkUser = async (req , res , next) => {
    const {users} = res.locals
    const {id} = req.params
    if (users.find((user) => user.id === id).loggedIn) {
        next()
    } else {
        return res.status(400).json({
            message : "You're not logged in"
        })
    }
}

module.exports = {
    checkUser
}