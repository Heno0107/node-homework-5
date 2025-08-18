const fs = require('fs').promises
const path = require('path')

const readFile = async (req , res , next) => {
    try {
        const users = JSON.parse(await fs.readFile(path.join(__dirname , '..' , 'db' , 'users.json') , 'utf-8'))
        res.locals.users = users
        next()
    } catch (err) {
       res.status(404).sendFile(path.join(__dirname , '..' , 'pages' , 'error.html'))
    }
}

module.exports = {
    readFile
}