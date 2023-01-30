const confirmPasswordCheck = (password, confirmPassword) => {

    const pwd = password.toString()
    const confirmPwd = confirmPassword.toString()
    // console.log("Password: ", pwd)
    // console.log("confirmPassword: ", confirmPwd)

    return new Promise((resolve, reject) => {
        if (password === confirmPassword) {
            // console.log("Password the same")
            resolve({
                error: false,
                class: "confirmPassword"
            })
        }
        if (password !== confirmPassword) {
            // console.log("Password NOT the same")
            reject({
                error: true, 
                class: "confirmPassword",    
                message: "Passwords are not the same."
            })
        }
    })
}



module.exports = confirmPasswordCheck