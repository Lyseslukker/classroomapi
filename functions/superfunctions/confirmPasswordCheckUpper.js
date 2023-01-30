const confirmPasswordCheck = require("../simplefunctions/confirmPasswordCheck.js")
const confirmPasswordLength = require("../simplefunctions/confirmPasswordLength.js")

const confirmPasswordCheckUpper = (password, confirmPassword) => {
    return Promise.all([
        confirmPasswordCheck(password, confirmPassword),
        confirmPasswordLength(confirmPassword)
    ])
}

module.exports = confirmPasswordCheckUpper