const { checkAge } = require("./checkAge");
const { checkBody } = require("./checkBody");
const { checkEmail } = require("./checkEmail");
const { bodyChange } = require("./bodyChange");
const { checkPassword } = require("./checkPassword");
const { readFile } = require("./readFile");

module.exports = {
    readFile ,
    checkBody ,
    checkAge , 
    checkEmail ,
    checkPassword ,
    bodyChange
}