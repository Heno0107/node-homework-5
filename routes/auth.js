const express = require('express')
const { readFile , checkLogin , checkEmail , bodyChange} = require('../middlewares')
const { AuthController } = require('../controllers/AuthController')

const authRouter = express.Router()

const authController = new AuthController()

authRouter.get('/register' , authController.getRegister)

authRouter.get('/login' , authController.getLogin)

authRouter.post('/register' , [readFile , bodyChange , checkEmail] , authController.register)

authRouter.post('/login' , [readFile , checkLogin] , authController.login)

authRouter.post('/logout' , readFile , authController.logout)

module.exports = {
    authRouter
}