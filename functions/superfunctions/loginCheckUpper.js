const db = require("../../db/database.js");



loginCheckUpper = (email, password) => {

    return db.execute(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`)
            .then((response) => {
                return response[0]
            })
            .catch((error) => {
                console.log(error)
            })
}




module.exports = loginCheckUpper