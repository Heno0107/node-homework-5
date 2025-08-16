const checkBody = (req , res , next) => {
    const { name , age , email , password } = req.body
    if(name && age && email && password) {
        next()
    } else {
        res.status(404).json({
            "error" : 'Please Fill All Required Fields'
        })
    }
}

module.exports = {
    checkBody
}