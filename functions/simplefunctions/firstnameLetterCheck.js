// Checks for SQL Injections (anything else than "a-å" will fail)
const firstnameLetterCheck = (name) => {
    const regExpr = /^[a-zA-Z æøåÆØÅ]*$/
        
    return new Promise((resolve, reject) => {
        if (name.match(regExpr)) {
            resolve({
                error: false, 
                class: "firstname"
            })
        }
        else {
            reject({
                error: true, 
                class: "firstname",
                message: "Username can only be a-å / A-Å"
            })
        }
    })
}


module.exports = firstnameLetterCheck