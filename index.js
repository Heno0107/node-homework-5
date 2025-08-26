const express = require('express')
const path = require('path')
const {response} = require('./helpers/response')
const { router } = require('./routes')
const { usersRouter } = require('./routes/users')
const { authRouter } = require('./routes/auth')
const { productsRouter } = require('./routes/products')

const app = express()

app.use(express.static('views'))

app.set('view engine' , 'ejs')

app.use(express.json())

app.use(express.urlencoded())

app.use('/' , router)

app.use('/api' , usersRouter)

app.use('/api' , productsRouter)

app.use('/api/users' , authRouter)

app.use((req , res) => {
    response(res , 'text/html' , 404)
    res.render('error' , {title : "Home"})
})

app.listen(3000 , (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Server Is Running...')
    }
})