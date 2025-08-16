const checkEmail = (req , res , next) => {
    const {users} = res.locals
    const {email} = req.body
    const user = users.find((user) => user.email === email)
    if (user) {
        res.json({
            "error" : 'Email is already used'
        })
    } else {
        next()
    }
}

module.exports = {
    checkEmail
}