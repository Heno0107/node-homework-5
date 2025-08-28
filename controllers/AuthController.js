class AuthController {
    async getRegister(req , res) {
        res.status(200).render('register' , {title : 'Register'})
    }
    async getLogin(req , res) {
        res.status(200).render('login' , {title : "Login"})
    }
    async register (req , res) {
        const {users , body} = res.locals
        await req.app.locals.services.auth.register(users,body)
        res.status(200).redirect('/auth/login')
    }
    async login (req , res) {
        const {users , user} = res.locals
        await req.app.locals.services.auth.login(users)
        res.status(200).json({
            message : `Welcome , ${user.name} ! , You're logged in successfully` ,
            info : user
        })
    }
    async logout (req , res) {
        const {users} = res.locals
        await req.app.locals.services.auth.logout(users)
        res.status(200).redirect('/')
    }
}

module.exports = {
    AuthController
}