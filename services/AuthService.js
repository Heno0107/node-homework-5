const fs = require('fs').promises
const path = require('path')

class AuthService {
    async register (users , body) {
        users.push(body)
        await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
        await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    }
    async login (users) {
        await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
        await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    }
    async logout (users) {
        users.find((user) => user.loggedIn).loggedIn = false
        await fs.unlink(path.join(__dirname, '..' , 'db', 'users.json'))
        await fs.appendFile(path.join(__dirname, '..' ,'db', 'users.json') , JSON.stringify(users , null , 2))
    }
}

module.exports = {
    AuthService
}