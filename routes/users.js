const express = require('express')
const { readFile , checkUser, checkBody } = require('../middlewares')
const { UsersController } = require('../controllers/UsersController')

const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get('/users' , readFile , usersController.getUsers)

usersRouter.get('/users/:id' , readFile , usersController.getUser)

usersRouter.patch('/users/:id' , [readFile , checkUser , checkBody] , usersController.patchUser)

usersRouter.delete('/users/:id' , [readFile , checkUser] , usersController.deleteUser)

module.exports = {
    usersRouter
}