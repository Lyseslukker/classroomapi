const validator = require("validator")


const passwordCheck = (password) => {
    // const regExCheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]$/;




    return new Promise((resolve, reject) => {
        // if (password.match(regExCheck)) {
        if (validator.isStrongPassword(password)) {
            resolve({
                error: false,
                class: "password"
            })
        }
        if (!validator.isStrongPassword(password)) {
            reject({
                error: true,
                class: "password",
                message:"Password needs to include Uppercase & Lowercase, a Number and a Special character ( !#$%&? )"
            })
        }
    })
}


module.exports = passwordCheck