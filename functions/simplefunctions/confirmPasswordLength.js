

const passwordLengthCheck = (password) => {
    return new Promise((resolve, reject) => {
        if (password.length >= 8) {
            resolve({
                error: false,
                class: "confirmPassword"
            })
        }
        if (password.length <= 7) {
            reject({
                error: true,
                class: "confirmPassword",
                message: "Password needs to be atleast 8 characters."
            })
        }
    })
}



module.exports = passwordLengthCheck