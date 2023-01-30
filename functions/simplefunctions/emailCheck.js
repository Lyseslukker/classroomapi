// const validator = require("validator")
// const hehe = validator.default.isStrongPassword("!Jegersej1")
// const hoho = validator.default.normalizeEmail("<SELECT * ALL>Jegerfandmesej@gmail.com")
// const haha = validator.default.isEmail("<SELECT * ALL>Jegerfandmesej@gmail.com")
// const hihi = validator.default.escape("<SELECT * ALL>Jegerfandmesej@gmail.com")

const emailCheck = (email) => {
    // const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]$/;
    const emailRegEx = /^.+\@.+\..+$/;
    return new Promise((resolve, reject) => {
        
        if (email.match(emailRegEx)) {
            resolve({error: false, class: "email"})
        }
        if (!email.match(emailRegEx)) {
            reject({error: true, class: "email", message: "Example Email: hello@world.com"})
        }
        
    })

}


module.exports = emailCheck