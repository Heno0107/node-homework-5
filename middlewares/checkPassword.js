const checkPassword = (req , res , next) => {

    const symbols = `!@#$%^&*()_+-[]{}'";:|/`
    const {password} = req.body
    let hasUpperCase = false
    let hasSymbol = false

    if (password.length <= 5) {
        return res.json({
            "error" : 'Password length must be more than 5'
        })
    }

    for(let char of password) {
        if (char >= 'A' && char <= 'Z') {
            hasUpperCase = true
        }
        if (symbols.includes(char)) {
            hasSymbol = true
        }
    }

    if (!hasSymbol) {
        return res.json({
            "error" : 'Password must include at least 1 symbol'
        })
    } 

    if (!hasUpperCase) {
        return res.json({
            "error" : 'Password must include at least 1 uppercase'
        })
    }

    next()
}

module.exports = {
    checkPassword
}