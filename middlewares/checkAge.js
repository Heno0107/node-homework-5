const checkAge = (req , res , next) => {
    const {age} = req.body
    if (typeof age === 'number') {
        if (age >= 18 && age <= 65) {
            next()
        } else {
            res.json({
                "error" : 'Sorry , You are not allowed to register because of your age'
            })
        }
    } else {
        res.json({
            "error" : 'Age must be a number'
        })
    }
}

module.exports = {
    checkAge
}