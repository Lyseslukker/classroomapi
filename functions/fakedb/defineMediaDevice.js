const defineMediaDevice = (deviceWidth) => {
    return new Promise((resolve, reject) => {
        if (deviceWidth >= 1280) {
            resolve("desktop")
        }
        if (deviceWidth < 1280 && deviceWidth >= 600) {
            resolve("tablet")
        }
        if (deviceWidth < 600 && deviceWidth >= 360) {
            resolve("phone")
        }
        if (deviceWidth < 360) {
            resolve("smartwatch")
        }
    })
}


module.exports = defineMediaDevice