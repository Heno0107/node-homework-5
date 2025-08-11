const path = require('path')

function response (res , contentType , statusCode) {
    res.set({
        "Cache-control" : 'no-store' ,
        "content-type" : contentType
    })
    res.status(statusCode)
}

module.exports = {
    response
}