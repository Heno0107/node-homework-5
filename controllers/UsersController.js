class UsersController {
    async getUsers (req , res) {
        const filteredUsers = await req.app.locals.services.users.getUsers(req.query)
        res.status(200).json(filteredUsers)
    }
    async getUser (req , res) {
        const {id} = req.params
        const user = await req.app.locals.services.users.getUser(id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).render('error')
        }
    }
    // async patchUser (req , res) {
    //     const {users} = res.locals
    //     const {id} = req.params
    //     const user = await req.app.locals.services.users.getUser(users , id)
    //     const updatedUsers = await req.app.locals.services.users.patchUser(users , user , req.body)
    //     res.json(updatedUsers)
    // }
    // async deleteUser (req , res) {
    //     const {users} = res.locals
    //     const {id} = req.params
    //     const filteredUsers = await req.app.locals.services.users.deleteUser(users , id)
    //     res.json(filteredUsers)
    // }
}

module.exports = {
    UsersController
}