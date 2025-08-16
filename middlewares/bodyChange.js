const bodyChange = (req , res , next) => {
    const { name , age , email , password} = req.body
    const { users } = res.locals
    let filteredName = name.toLowerCase().split('')
    filteredName[0] = filteredName[0].toUpperCase()
    filteredName = filteredName.join('')
    res.locals.body = {
        id : (Number(users.at(-1).id) + 1).toString() ,
        name : filteredName ,
        age ,
        email ,
        password
    }
    next()
}

module.exports = {
    bodyChange
}