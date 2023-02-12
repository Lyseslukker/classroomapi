const encrypt = require("./encrypt.js")
const db = require("../../db/database.js")

const createNewUser = (tempEmail, firstname, lastname, tempPassword, role) => {
    return new Promise( async (resolve, reject) => {
        const email = await encrypt(tempEmail).then(encryption => encryption)
        const password = await encrypt(tempPassword).then(encryption => encryption)
        db.execute('INSERT INTO users (email, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)', 
        [email, firstname, lastname, password, role])

        try {
            resolve("Success")
        } catch (error) {
            reject("Failed to create user")
        }

    })
}


module.exports = createNewUser