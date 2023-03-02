const crypto = require('crypto')
const dotenv = require("dotenv")
dotenv.config()

var iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf8')
const secret = process.env.ENCRYPTION_KEY

function decrypt(encrypted) {
    return new Promise((resolve, reject) => {
        const decipher = crypto.createDecipheriv("aes-256-cbc", secret, Buffer.from(iv, "hex"))
        let decrypted = decipher.update(encrypted, "hex", "utf8")
        decrypted += decipher.final("utf8")
        
        if (!decrypted) {
            reject("Could'nt decrypt message")
        }
        if (decrypted) {
            resolve(decrypted)
        }

    })
}


module.exports = decrypt
