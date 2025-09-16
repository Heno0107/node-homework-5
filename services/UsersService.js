const fs = require('fs').promises
const path = require('path')
const { connectDb , getDb } = require('../db')
const { ObjectId } = require('mongodb')

let myDb

connectDb(() => {
    myDb = getDb()
})

class UsersService {
    async getUsers (query) {
        const { name , age } = query
        let filteredUsers = await myDb.collection('users').find()
        if (name) {
            filteredUsers = await myDb.collection('users').find({name : name})
        }
        if (age) {
            if (age.toLowerCase() === 'min') {
                filteredUsers = await myDb.collection('users').find().sort({age : 1})
            } else if (age.toLowerCase() === 'max') {
                filteredUsers = await myDb.collection('users').find().sort({age : -1})
            }
        }
        return filteredUsers.toArray()
    }
    async getUser (id) {
        const user = myDb.collection('users').findOne({_id : new ObjectId(id)})
        return user
    }
    // async patchUser (users , user , body) {
    //     Object.assign(user , body)
    //     await fs.unlink(path.join(__dirname , '..' , 'db' , 'users.json'))
    //     await fs.appendFile(path.join(__dirname , '..' , 'db' , 'users.json') , JSON.stringify(users , null , 2))
    //     return users
    // }
    // async deleteUser (users , id) {
    //     const filteredUsers = users.filter((user) => user.id !== id)
    //     await fs.unlink(path.join(__dirname , '..' , 'db' , 'users.json'))
    //     await fs.appendFile(path.join(__dirname , '..' , 'db' , 'users.json') , JSON.stringify(filteredUsers , null , 2))
    //     return filteredUsers
    // }
}

module.exports = {
    UsersService
}