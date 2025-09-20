const { ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

class AuthService {
    constructor (models) {
        this.models = models
    }
    async register (body) {
        const newUser = await this.models.users(body)
        const user = await newUser.save()
        return user
    }
    async login (body , user) {
        if (user) {
            if (bcrypt.compare(body.password , user.password)) {
                await this.models.users.findOneAndUpdate({_id : new ObjectId(user._id)}, {loggedIn : true} , {new : true})
            }
        }
    }
    async logout () {
        const user = await this.models.users.findOne({loggedIn : true})
        await this.models.users.findOneAndUpdate({_id : new ObjectId(user._id)}, {loggedIn : false})
    }
}

module.exports = {
    AuthService
}