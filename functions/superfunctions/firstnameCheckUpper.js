const firstnameLengthCheck = require("../simplefunctions/firstnameLengthCheck.js")
const firstnameLetterCheck = require("../simplefunctions/firstnameLetterCheck.js")

const firstnameCheckUpper = (firstname) => {
    return Promise.all([
        firstnameLengthCheck(firstname),
        firstnameLetterCheck(firstname)
    ])
}


module.exports = firstnameCheckUpper