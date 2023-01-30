// Checking Username
// Checking for length and if username is available
const lastnameLengthCheck = (name) => {
    return new Promise((resolve, reject) => {
        // Length of Username
        // Checks if length is above 3 charactors and below 25 charactors
        if (name.length > 3 && name.length < 25) {
            resolve({
                error: false, 
                class: "lastname"
            })
        }
        // Rejects if username length less then 3 or above 25
        else {
            reject({
                error: true,
                class: "lastname",
                message: "Lastname must be above 3 characters and below 25"
            })
        }
    })
}

module.exports = lastnameLengthCheck