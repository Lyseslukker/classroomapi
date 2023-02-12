const crypto = require('crypto');
const dotenv = require("dotenv")
dotenv.config()

var iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf8');
const secret = 'Asmon!gold-21Red!Apples-!Sonny!!';



function encrypt(text, secret, iv) {
    const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted
}

function decrypt(encrypted, secret, iv) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}






const theObject = {
    tempUserID: "123",
    tempCount: 1,
    tempDesktopID: "123",
    tempTabletID: "123",
    tempPhoneID: "123",
    tempWatchID: "123",
}
const theObjectJSONString = JSON.stringify(theObject)

// // Encrypt
// const encrypted = encrypt(theObjectJSONString, secret, iv);
// console.log("Encrypted Data:", encrypted);
// console.log(encrypted.length)

// // Decrypt
// const decrypted = decrypt(encrypted, secret, iv);
// const decryptedObjectyfied = JSON.parse(decrypted)
// console.log("Decrypted Data:", decryptedObjectyfied);