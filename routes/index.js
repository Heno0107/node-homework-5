const express = require('express')
const { HomeController } = require('../controllers/HomeController')

const homeController = new HomeController()

const router = express.Router()

router.get('' , homeController.getHome)

module.exports = {
    router
}

//path.join(__dirname , '..' , 'view' , 'index.ejs')