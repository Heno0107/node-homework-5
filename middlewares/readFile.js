const fs = require('fs').promises
const path = require('path')

const readFile = async (req , res , next) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join(__dirname , '..' , 'db' , 'users.json') , 'utf-8'))
        const products = JSON.parse(await fs.readFile(path.join(__dirname , '..' , 'db' , 'products.json') , 'utf-8'))
        res.locals.users = users
        res.locals.products = products
        next()
    } catch (err) {
       res.status(404).render('error')
    }
}

module.exports = {
    readFile
}