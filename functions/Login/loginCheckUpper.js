const db = require("../../db/database.js");

loginCheckUpper = (email, password) => {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`)
        .then((response) => {
            // console.log(response[0][0])
            resolve(response[0][0].id)
        })
        .catch((error) => {
            reject(error)
        })
    })
}




module.exports = loginCheckUpper