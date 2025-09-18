class UsersService {
    constructor (models) {
        this.models = models
    }
    async getUsers (query) {
        const { name , age } = query
        let filteredUsers = await this.models.users.find()
        if (name) {
            filteredUsers = await this.models.users.find({name : name})
        }
        if (age) {
            if (age.toLowerCase() === 'min') {
                filteredUsers = await this.models.users.find().sort({age : 1})
            } else if (age.toLowerCase() === 'max') {
                filteredUsers = await this.models.users.find().sort({age : -1})
            }
        }
        return filteredUsers
    }
    async getUser (id) {
        const user = this.models.users.findById(id)
        return user
    }
    async patchUser (user , body) {
        const updatedUser = this.models.users(body)
        await this.models.users.findOneAndUpdate({_id : user._id}, updatedUser , {new : true})
    }
    async deleteUser (id) {
        const deletedUser = await this.models.users.findOneAndDelete({_id : id} , {new : true})
        return deletedUser
    }
}

module.exports = {
    UsersService
}