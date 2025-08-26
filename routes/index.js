const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')

const router = express.Router()

router.get('' , (req , res) => {
    res.status(200).render( 'index' , {title : "Home"})
})

module.exports = {
    router
}

//path.join(__dirname , '..' , 'view' , 'index.ejs')