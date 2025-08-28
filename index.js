const express = require('express')
const { router } = require('./routes')
const { usersRouter } = require('./routes/users')
const { authRouter } = require('./routes/auth')
const { UsersService } = require('./services/UsersService')
const { AuthService } = require('./services/AuthService')

const app = express()

app.use(express.static('views'))

app.set('view engine' , 'ejs')

app.use(express.json())

app.use(express.urlencoded())

app.locals.services = {
    users : new UsersService() ,
    auth : new AuthService()
}

app.use('/' , router)

app.use('/api' , usersRouter)

app.use('/auth' , authRouter)

app.use((req , res) => {
    res.status(404).render('error' , {title : "Home"})
})

app.listen(3000 , (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Server Is Running...')
    }
})