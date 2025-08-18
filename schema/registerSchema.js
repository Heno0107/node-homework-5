const joi = require('joi')

const schema = joi.object({
    name : joi.string()
        .required() ,
    age : joi.number()
        .integer()
        .min(18)
        .max(65)
        .required() ,
    email : joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'ru'] } })
        .required() ,
    password : joi.string()
        .min(5)
        .max(20)
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$')) 
        .required() ,
    repeat_password : joi.ref('password')
})

module.exports = {
    schema
}