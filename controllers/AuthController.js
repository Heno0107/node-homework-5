class AuthController {
    async getRegister(req , res) {
        res.status(200).render('register' , {title : 'Register'})
    }
    async getLogin(req , res) {
        res.status(200).render('login' , {title : "Login"})
    }
    async register (req , res) {
        try {
            const { body } = res.locals
            await req.app.locals.services.auth.register(body)
            res.status(200).redirect('/auth/login')
        } catch (error) {
            res.json({
                "message" : error.message
            })
        }
    }
    async login (req , res) {
        const body = req.body
        const user = await this.models.users.findOne({email : body.email})
        if (!user.loggedIn) {
            await req.app.locals.services.auth.login(body , user)
            res.status(200).json({
                message : `Welcome , ${body.email} ! , You're logged in successfully` ,
                info : body
            })
        } else {
            res.status(400).json({
                message : 'Youre already logged in'
            })
        }
    }
    async logout (req , res) {
        await req.app.locals.services.auth.logout()
        res.status(200).redirect('/')
    }
}

module.exports = {
    AuthController
}