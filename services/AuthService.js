const fs = require('fs').promises
const path = require('path')
const { connectDb , getDb } = require('../db')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

let myDb

connectDb(() => {
    myDb = getDb()
})

class AuthService {
    async register (body) {
        const user = await myDb.collection('users').findOne({email : body.email})
        if (!user) {
            await myDb.collection('users').insertOne(body)
        }
    }
    async login (body) {
        const user = await myDb.collection('users').findOne({email : body.email})
        if (user) {
            if (bcrypt.compare(body.password , user.password)) {
                await myDb.collection('users').updateOne({_id : new ObjectId(user._id)}, {$set : {loggedIn : true}})
            }
        }
    }
    async logout () {
        const user = await myDb.collection('users').findOne({loggedIn : true})
        await myDb.collection('users').updateOne({_id : ObjectId(user._id)}, {$set : {loggedIn : false}})
    }
}

module.exports = {
    AuthService
}