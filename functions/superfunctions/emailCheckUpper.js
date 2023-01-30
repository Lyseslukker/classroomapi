const emailAvailability = require("../simplefunctions/emailAvailability.js")
const emailCheck = require("../simplefunctions/emailCheck.js")

const emailCheckUpper = (email) => {
    return Promise.all([
        emailCheck(email),
        emailAvailability(email)
    ])
}



module.exports = emailCheckUpper