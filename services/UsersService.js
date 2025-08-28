const fs = require('fs').promises
const path = require('path')

class UsersService {
    async getUsers (users , query) {
        const { name , age } = query
        let filteredUsers = users
        if (name) {
            filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
        }
        if (age) {
            if (age.toLowerCase() === 'min') {
                filteredUsers = filteredUsers.toSorted((a , b) => a.age - b.age)
            } else if (age.toLowerCase() === 'max') {
                filteredUsers = filteredUsers.toSorted((a , b) => b.age - a.age)
            }
        }
        return filteredUsers
    }
    async getUser (users , id) {
        const user = users.find((user) => user.id === id)
        return user
    }
    async patchUser (users , user , body) {
        Object.assign(user , body)
        await fs.unlink(path.join(__dirname , '..' , 'db' , 'users.json'))
        await fs.appendFile(path.join(__dirname , '..' , 'db' , 'users.json') , JSON.stringify(users , null , 2))
        return users
    }
    async deleteUser (users , id) {
        const filteredUsers = users.filter((user) => user.id !== id)
        await fs.unlink(path.join(__dirname , '..' , 'db' , 'users.json'))
        await fs.appendFile(path.join(__dirname , '..' , 'db' , 'users.json') , JSON.stringify(filteredUsers , null , 2))
        return filteredUsers
    }
}

module.exports = {
    UsersService
}