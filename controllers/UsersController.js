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
    async patchUser (req , res) {
        try {
            const {id} = req.params
            const user = await req.app.locals.services.users.getUser(id)
            const updatedUsers = await req.app.locals.services.users.patchUser(user , req.body)
            res.json(updatedUsers)
        } catch (error) {
            res.json({
                "message" : error.message
            })
        }
    }
    async deleteUser (req , res) {
        try {
            const {id} = req.params
            const deletedUser = await req.app.locals.services.users.deleteUser(id)
            res.json(deletedUser)
        } catch (error) {
            res.json({
                "message" : error.message
            })
        }
    }
}

module.exports = {
    UsersController
}