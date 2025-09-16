const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017/usersDb"

let db

module.exports = {
    connectDb : (cb) => {
        MongoClient.connect(URL)
            .then((client) => {
                db = client.db()
                cb()
            })
            .catch((err) => cb(err))
    } ,
    getDb : () => db
}