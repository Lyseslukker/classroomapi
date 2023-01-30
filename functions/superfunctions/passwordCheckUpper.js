const passwordLengthCheck = require("../simplefunctions/passwordLengthCheck.js")
const passwordCheck = require("../simplefunctions/passwordCheck.js")


const passwordCheckUpper = (password) => {
    return Promise.all([
        passwordLengthCheck(password),
        passwordCheck(password)
    ])
}


module.exports = passwordCheckUpper