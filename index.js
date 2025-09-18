const express = require('express')
const { router } = require('./routes')
const { usersRouter } = require('./routes/users')
const { authRouter } = require('./routes/auth')
const { UsersService } = require('./services/UsersService')
const { AuthService } = require('./services/AuthService')
const mongoose = require('mongoose')
const models = require('./models')

mongoose.connect("mongodb://localhost:27017/usersDb")
  .then(() => {
    console.log('Database Connected!')
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(express.static('views'))

app.set('view engine' , 'ejs')

app.use(express.json())

app.use(express.urlencoded())

app.locals.models = {
  users : models.users
}

app.locals.services = {
    users : new UsersService(app.locals.models) ,
    auth : new AuthService(app.locals.models)
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