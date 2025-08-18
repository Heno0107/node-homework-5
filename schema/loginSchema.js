const joi = require('joi')

const loginSchema = joi.object({
    email : joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net' , 'ru'] } })
        .required() ,
    password : joi.string()
        .required()
})

module.exports = {
    loginSchema
}