

const passwordLengthCheck = (password) => {
    return new Promise((resolve, reject) => {
        if (password.length >= 8) {
            resolve({
                error: false,
                class: "password"
            })
        }
        if (password.length <= 7) {
            reject({
                error: true,
                class: "password",
                message: "Password needs to be atleast 8 characters."
            })
        }
    })
}



module.exports = passwordLengthCheck