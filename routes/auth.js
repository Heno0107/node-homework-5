const express = require('express')
const {bodyChange} = require('../middlewares')
const { AuthController } = require('../controllers/AuthController')

const authRouter = express.Router()

const authController = new AuthController()

authRouter.get('/register' , authController.getRegister)

authRouter.get('/login' , authController.getLogin)

authRouter.post('/register' , [bodyChange] , authController.register)

authRouter.post('/login' , authController.login)

authRouter.post('/logout' , authController.logout)

module.exports = {
    authRouter
}