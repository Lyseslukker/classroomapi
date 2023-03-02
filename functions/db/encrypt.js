const crypto = require('crypto')
const dotenv = require("dotenv")
dotenv.config()

const random = Math.floor(Math.random() * 10000000000000000) + 1
const iv = random.toString()
// console.log(testIV)
// const iv = crypto.randomBytes(16)
// var iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf8')
const secret = process.env.ENCRYPTION_KEY

const encrypt = (text) => {
    return new Promise((resolve, reject) => {
        const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv)
        let encrypted = cipher.update(text, "utf8", "hex")
        encrypted += cipher.final("hex")
        
        if (!encrypted) {
            reject("Could'nt encrypt message")
        }
        if (encrypted) {
            resolve({
                encryption: encrypted,
                ivkey: iv
            })
        }
    })
}


module.exports = encrypt