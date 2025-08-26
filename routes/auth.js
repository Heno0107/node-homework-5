const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const fs = require('fs').promises
const { readFile , checkLogin , checkEmail , bodyChange} = require('../middlewares')

const authRouter = express.Router()


authRouter.get('/register' , (req , res) => {
    res.status(200).render('register' , {title : 'Register'})
})

authRouter.post('/register' , [readFile , bodyChange , checkEmail] , async (req , res) => {
    const {users , body} = res.locals
    users.push(body)
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    response(res , 'application/json' , 200)
    res.redirect('/login')
})

authRouter.get('/login' , (req , res) => {
    res.status(200).render('login' , {title : "Login"})
})

authRouter.post('/login' , [readFile , checkLogin] , async (req , res) => {
    const {users , user} = res.locals
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    response(res , 'application/json' , 200)
    res.json({
        message : `Welcome , ${user.name} ! , You're logged in successfully` ,
        info : user
    })
    res.redirect(`/${user.id}`)
})

authRouter.post('/logout' , readFile , async (req , res) => {
    const {users} = res.locals
    const {id} = users.find((user) => user.loggedIn)
    users.forEach((u) => {
        if(u.id === id) {
            u.loggedIn = false
        }
    })
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    response(res , 'application/json' , 200)
    res.json({
        message : "You're successfully logged out"
    })
})

module.exports = {
    authRouter
}