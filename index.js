const express = require('express')
const path = require('path')
const {readFile} = require('./helpers/readFile')
const {response} = require('./helpers/response')

const app = express()

app.get('/' , (req , res) => {
    response(res , 'text/html' , 200)
    res.sendFile(path.join(__dirname , 'pages' , 'index.html'))
})

app.get('/api/users' , async (req , res) => {
    const users = JSON.parse(await readFile('users' , 'users.json'))
    response(res , 'application/json' , 200)
    res.json(users)
})

app.get('/api/users/:id' , async (req , res) => {
    const {id} = req.params
    const users = JSON.parse(await readFile('users' , 'users.json'))
    const user = users.find((user) => user.id === id)
    if (user) {
        response(res , 'application/json' , 200)
        res.json(user)
    } else {
        response(res , 'text/html' , 404)
        res.sendFile(path.join(__dirname , 'pages' , 'error.html'))
    }
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