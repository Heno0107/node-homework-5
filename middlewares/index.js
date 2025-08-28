const { checkEmail } = require("./checkEmail");
const { bodyChange } = require("./bodyChange");
const { readFile } = require("./readFile");
const { checkLogin } = require("./checkLogin");
const { checkUser } = require("./checkUser");
const { checkBody } = require("./checkBody");

module.exports = {
    readFile ,
    checkEmail ,
    bodyChange ,
    checkLogin ,
    checkUser ,
    checkBody
}