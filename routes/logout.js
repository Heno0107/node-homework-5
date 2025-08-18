const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const { readFile } = require('../middlewares')
const fs = require('fs').promises

const logoutRouter = express.Router()

logoutRouter.post('/logout' , readFile , async (req , res) => {
    const {users} = res.locals
    const {id} = users.find((user) => user.LoggedIn)
    users.forEach((u) => {
        if(u.id === id) {
            u.LoggedIn = false
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
    logoutRouter
}