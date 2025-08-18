const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const { readFile } = require('../middlewares')

const usersRouter = express.Router()

usersRouter.get('/users' , readFile , async (req , res) => {
    const { name , age } = req.query
    const {users} = res.locals
    let filteredUsers = users
    if (name) {
        filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
    }
    if (age) {
        if (age.toLowerCase() === 'min') {
            filteredUsers = filteredUsers.toSorted((a , b) => a.age - b.age)
        } else if (age.toLowerCase() === 'max') {
            filteredUsers = filteredUsers.toSorted((a , b) => b.age - a.age)
        }
    }
    response(res , 'application/json' , 200)
    res.json(filteredUsers)
})

usersRouter.get('/users/:id' , readFile , async (req , res) => {
    const {id} = req.params
    const {users} = res.locals
    const user = users.find((user) => user.id === id)
    if (user) {
        response(res , 'application/json' , 200)
        res.json(user)
    } else {
        response(res , 'text/html' , 404)
        res.sendFile(path.join(__dirname , 'pages' , 'error.html'))
    }
})

module.exports = {
    usersRouter
}