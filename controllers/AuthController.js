class AuthController {
    async getRegister(req , res) {
        res.status(200).render('register' , {title : 'Register'})
    }
    async getLogin(req , res) {
        res.status(200).render('login' , {title : "Login"})
    }
    async register (req , res) {
        const { body } = res.locals
        await req.app.locals.services.auth.register(body)
        res.status(200).redirect('/auth/login')
    }
    async login (req , res) {
        const body = req.body
        await req.app.locals.services.auth.login(body)
        res.status(200).json({
            message : `Welcome , ${body.email} ! , You're logged in successfully` ,
            info : body
        })
    }
    async logout (req , res) {
        await req.app.locals.services.auth.logout()
        res.status(200).redirect('/')
    }
}

module.exports = {
    AuthController
}