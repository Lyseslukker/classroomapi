const lastnameLengthCheck = require("../simplefunctions/lastnameLengthCheck.js")
const lastnameLetterCheck = require("../simplefunctions/lastnameLetterCheck.js")

const lastnameCheckUpper = (lastname) => {
    return Promise.all([
        lastnameLengthCheck(lastname),
        lastnameLetterCheck(lastname)
    ])
}

module.exports = lastnameCheckUpper