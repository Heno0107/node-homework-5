const joi = require('joi')

const patchSchema = joi.object({
    name : joi.string(),
    age : joi.number()
        .integer()
        .min(18)
        .max(65),
    email : joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'ru'] } }),
    password : joi.string()
        .min(5)
        .max(20)
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[_!@#$%^&*(),.?":{}|<>]).+$')) ,
    repeat_password : joi.ref('password') ,
    role : joi.string()
        .pattern(/^(admin|user)$/i)
})

module.exports = {
    patchSchema
}