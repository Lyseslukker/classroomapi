const createUUID = (id) => {
    return new Promise((resolve, reject) => {
        const db = require("../../db/database.js")
        const { v4: uuidv4 } = require('uuid');
        const uuid = uuidv4()
        if(uuid) {
            db.execute(`UPDATE users SET tempid = '${uuid}' WHERE id = ${id};`)
                .then((dbResponse) => {
                    // console.log(dbResponse)
                    resolve(uuid)
                })
                .catch((err) => {
                    // console.log(err)
                    reject("Could'nt update users tempid")
                })
        }
        if(!uuid) {
            reject("Failed to create uuid for user login")
        }
        
    })
}


module.exports = createUUID