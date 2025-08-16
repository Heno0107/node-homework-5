const express = require('express')
const fs = require('fs').promises
const path = require('path')
const {response} = require('./helpers/response')
const { readFile , checkBody , checkAge , checkEmail , checkPassword , bodyChange} = require('./middlewares')

const app = express()

app.use(express.json())

app.get('/' , (req , res) => {
    response(res , 'text/html' , 200)
    res.sendFile(path.join(__dirname , 'pages' , 'index.html'))
})

app.get('/api/users' , readFile , async (req , res) => {
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

app.get('/api/users/:id' , readFile , async (req , res) => {
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

app.post('/api/users' , [readFile , checkBody , checkAge , checkEmail , checkPassword , bodyChange] , async (req , res) => {
    const {users , body} = res.locals
    users.push(body)
    await fs.unlink(path.join(__dirname, 'users', 'users.json'))
    await fs.appendFile(path.join(__dirname, 'users', 'users.json') , JSON.stringify(users))
    response(res , 'application/json' , 200)
    res.json(users)
})

app.use((req , res) => {
    response(res , 'text/html' , 404)
    res.sendFile(path.join(__dirname , 'pages' , 'error.html'))
})

app.listen(3000 , (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Server Is Running...')
    }
})