const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config()


// function decrypt(encrypted) {
//     return new Promise((resolve, reject) => {
//         const secretkey = process.env.ENCRYPTION_KEY
//         const decipher = crypto.createDecipher('aes-256-cbc', secretkey);
//         let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//         decrypted += decipher.final('utf8');
        
//         try {
//             resolve(decrypted)
//         } catch (error) {
//             reject("Could'nt decrypt the message")
//         }
        
        
//         return decrypted;
//     })
// }


const decrypt = ((text) => {
    return new Promise((resolve, reject) => {
        let decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGO, process.env.ENCRYPTION_KEY, process.env.ENCRYPTION_IV);
        let decrypted = decipher.update(text, 'base64', 'utf8');

        if (decrypted) {
            resolve(decrypted + decipher.final('utf8'))
        }
        if (!decrypted) {
            reject("Failed to decrypt")
        }
    })
});

module.exports = decrypt