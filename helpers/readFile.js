const fs = require('fs').promises
const path = require('path')

async function readFile (folder , file) {
    return await fs.readFile(path.join(__dirname , '..' , folder , file) , 'utf-8')
}

module.exports = {
    readFile
}