const crypto = require('crypto');
const dotenv = require("dotenv")
dotenv.config()









function encrypt(text) {
    return new Promise((resolve, reject) => {
        const secretkey = process.env.ENCRYPTION_KEY
        const cipher = crypto.createCipher('aes-256-cbc', secretkey);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        try {
            resolve(encrypted)
        } catch (err) {
            reject("Encryption failed")
        }
        // return encrypted;
    })
}

// const encrypt = ((text) => {
//     return new Promise((resolve, reject) => {
//         let cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
//         let encrypted = cipher.update(text, 'utf8', 'base64');
//         encrypted += cipher.final('base64');

//         if (encrypted) {
//             resolve(encrypted)
//         }
//         if (!encrypted) {
//             reject("Failed to encrypt")
//         }
//     })
// });

module.exports = encrypt
