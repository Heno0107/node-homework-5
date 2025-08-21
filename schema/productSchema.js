const joi = require('joi')

const productSchema = joi.object({
    title : joi.string()
        .required() ,
    price : joi.number()
        .required() ,
    description : joi.string()
        .required()
})

module.exports = {
    productSchema
}