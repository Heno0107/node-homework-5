const express = require('express')
const path = require('path')
const {response} = require('./helpers/response')
const { router } = require('./routes')
const { usersRouter } = require('./routes/users')
const { registerRouter , loginRouter , logoutRouter } = require('./routes/auth')
const { productsRouter } = require('./routes/products')

const app = express()

app.use(express.json())

app.use('/' , router)

app.use('/api' , usersRouter)

app.use('/api' , productsRouter)

app.use('/api/users' , registerRouter)

app.use('/api/users' , loginRouter)

app.use('/api/users' , logoutRouter)

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