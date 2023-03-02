const generateTimestamp = (tempClientDateObject) => {
    return new Promise((resolve, reject) => {
        const expiryDate = new Date()
        expiryDate.setUTCSeconds(expiryDate.getUTCSeconds() + tempClientDateObject.clientSecondsLeft)
        expiryDate.setUTCMinutes(expiryDate.getUTCMinutes() + tempClientDateObject.clientMinutesLeft)
        expiryDate.setUTCHours(expiryDate.getUTCHours() + tempClientDateObject.clientHoursLeft)
        // console.log("ExpiryDate After:  ", expiryDate)

        if (!expiryDate) {
            reject("Failed to create expiry date")
        }
        if (expiryDate) {
            resolve(expiryDate)
        }
    })
}

module.exports = generateTimestamp