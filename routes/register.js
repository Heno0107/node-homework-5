const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const fs = require('fs').promises
const { readFile , checkEmail , bodyChange} = require('../middlewares')

const registerRouter = express.Router()

registerRouter.post('/register' , [readFile , bodyChange , checkEmail] , async (req , res) => {
    const {users , body} = res.locals
    users.push(body)
    await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users))
    response(res , 'application/json' , 200)
    res.json(users)
})

module.exports = {
    registerRouter
}