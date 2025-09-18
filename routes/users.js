const express = require('express')
const { checkUser, checkBody } = require('../middlewares')
const { UsersController } = require('../controllers/UsersController')

const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get('/users' , usersController.getUsers)

usersRouter.get('/users/:id' , usersController.getUser)

usersRouter.patch('/users/:id' , [checkUser , checkBody] , usersController.patchUser)

// usersRouter.delete('/users/:id' , [checkUser] , usersController.deleteUser)

module.exports = {
    usersRouter
}