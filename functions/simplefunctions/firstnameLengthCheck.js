// Checking Username
// Checking for length and if username is available
const firstnameLengthCheck = (name) => {
    return new Promise((resolve, reject) => {
        // Length of Username
        // Checks if length is above 3 charactors and below 25 charactors
        if (name.length > 3 && name.length < 25) {
            resolve({error: false, class: "firstname"})
        }
        // Rejects if username length less then 3 or above 25
        else {
            reject({
                error: true,
                class: "firstname",
                message: "Firstname must be above 3 characters and below 25"
            })
        }
    })
}

module.exports = firstnameLengthCheck