const { v4: uuidv4 } = require('uuid');

const generateCSRFtoken = () => {
    return new Promise((resolve, reject) => {
        const csrfToken = uuidv4()

        if (!csrfToken) {
            reject("Failed to create CSRF token")
        }
        if (csrfToken) {
            resolve(csrfToken)
        }
    })
}


module.exports = generateCSRFtoken