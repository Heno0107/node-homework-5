const { checkEmail } = require("./checkEmail");
const { bodyChange } = require("./bodyChange");
const { readFile } = require("./readFile");
const { checkLogin } = require("./checkLogin");
const { checkUser } = require("./checkUser");

module.exports = {
    readFile ,
    checkEmail ,
    bodyChange ,
    checkLogin ,
    checkUser
}