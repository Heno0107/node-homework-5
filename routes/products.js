const express = require('express')
const { response } = require('../helpers/response')
const path = require('path')
const fs = require('fs').promises
const { readFile, checkUser } = require('../middlewares')

const productsRouter = express.Router()

productsRouter.get('/products' , readFile , (req , res) => {
    const {products} = res.locals
    response(res , 'application/json' , 200)
    res.json(products)
})

productsRouter.post('/products' , [readFile , checkUser] , async (req , res) => {
    const {products , product} = res.locals
    products.push(product)
    await fs.unlink(path.join(__dirname, '..' , 'db', 'products.json'))
    await fs.appendFile(path.join(__dirname, '..' ,'db', 'products.json') , JSON.stringify(products , null , 2))
    response(res , 'application/json' , 200)
    res.json(products)
    res.redirect('/products')
})

module.exports = {
    productsRouter
}