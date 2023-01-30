const usedEmails = ["kaptajnen89@gmail.com", "lyseslukker@gmail.com", "kødhakkeren@gmail.com"]


const emailAvailability = (email) => {
    return new Promise((resolve, reject) => {
        const emailFilter = usedEmails.filter((usedEmail) => {
            return usedEmail === email
        })

        if (emailFilter.length === 0) {
            resolve({error: false, class: "email"})
        }
        if (emailFilter.length !== 0) {
            reject({error: true, class: "email", message: "Email already taken."})
        }

    })
}


module.exports = emailAvailability