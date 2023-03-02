const defineMediaDevice = require("./defineMediaDevice.js")
const generateTimestamp = require("./generateTimestamp.js")
const generateCSRFtoken = require("./generateCSRFtoken.js")
const generateTempid = require("./generateTempid.js")
const loginCheckUpper = require("../Login/loginCheckUpper.js")
const encrypt = require("../db/encrypt.js")


const createFakeIdObject = (clientDate, clientScreenWidth, clientEmail, clientPassword) => {
    const promises = [
        generateTimestamp(clientDate), 
        defineMediaDevice(clientScreenWidth),
        loginCheckUpper(clientEmail, clientPassword),
        generateCSRFtoken(),
        generateTempid()
    ]

    return Promise.allSettled(promises)
        .then((result) => {
            // console.log(result)
            let tempObject = {
                timestamp: result[0].value,
                csrf: result[3].value,
                iv: null,
                tempid: {
                    id: result[2].value,
                    media: result[1].value,
                    uuid: result[4].value
                }
            }
            const objectStringed = JSON.stringify(tempObject.tempid)

            return encrypt(objectStringed)
                .then((encryptionObject) => {
                    console.log(encryptionObject)
                    const temp = {
                        ...tempObject,
                        tempid: encryptionObject.encryption,
                        iv: encryptionObject.ivkey
                    }
                    return temp
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}


module.exports = createFakeIdObject