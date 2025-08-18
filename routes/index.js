const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')

const router = express.Router()

router.get('/' , (req , res) => {
    response(res , 'text/html' , 200)
    res.sendFile(path.join(__dirname , '..' , 'pages' , 'index.html'))
})

module.exports = {
    router
}