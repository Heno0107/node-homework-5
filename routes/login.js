const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const { readFile , checkLogin} = require('../middlewares')
const fs = require('fs').promises

const loginRouter = express.Router()

loginRouter.post('/login' , [readFile , checkLogin] , async (req , res) => {
    const {users , user} = res.locals
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users))
    response(res , 'application/json' , 200)
    res.json({
        message : `Welcome , ${user.name} ! , You're logged in successfully` ,
        info : user
    })
})

module.exports = {
    loginRouter
}