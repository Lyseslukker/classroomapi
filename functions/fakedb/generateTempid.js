const { v4: uuidv4 } = require('uuid');

const generateTempid = () => {
    return new Promise((resolve, reject) => {
        const tempid = uuidv4()
        if (!tempid) {
            reject("Failed to generate tempID")
        }
        if (tempid) {
            resolve(tempid)
        }
    })
}


module.exports = generateTempid