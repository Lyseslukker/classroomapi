// Checks for SQL Injections (anything else than "a-å" will fail)
const lastnameLetterCheck = (name) => {
    const regExpr = /^[a-zA-Z æøåÆØÅ]*$/
        
    return new Promise((resolve, reject) => {
        if (name.match(regExpr)) {
            resolve({
                error: false, 
                class: "lastname"
            })
        }
        else {
            reject({
                error: true, 
                class: "lastname",
                message: "Username can only be a-å / A-Å"
            })
        }
    })
}


module.exports = lastnameLetterCheck