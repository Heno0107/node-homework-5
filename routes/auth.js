const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const fs = require('fs').promises
const { readFile , checkLogin , checkEmail , bodyChange} = require('../middlewares')

const registerRouter = express.Router()
const loginRouter = express.Router()
const logoutRouter = express.Router()

registerRouter.post('/register' , [readFile , bodyChange , checkEmail] , async (req , res) => {
    const {users , body} = res.locals
    users.push(body)
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users))
    response(res , 'application/json' , 200)
    res.json(users)
})

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

logoutRouter.post('/logout' , readFile , async (req , res) => {
    const {users} = res.locals
    const {id} = users.find((user) => user.loggedIn)
    users.forEach((u) => {
        if(u.id === id) {
            u.loggedIn = false
        }
    })
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users))
    response(res , 'application/json' , 200)
    res.json({
        message : "You're successfully logged out"
    })
})

module.exports = {
    registerRouter ,
    loginRouter ,
    logoutRouter
}