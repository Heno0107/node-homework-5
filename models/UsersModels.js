const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    age : {
        type : Number ,
        required : true
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    password : {
        type : String ,
        required : true
    } ,
    loggedIn : {
        type : Boolean
    }
} , {
    timestamps : true
})

UserSchema.pre('save' , async function (next) {
    const hashPassword = await bcrypt.hash(this.password , 10)
    this.password = hashPassword
    this.loggedIn = false
    next()
})

module.exports = mongoose.model('users' , UserSchema)