const express = require("express")
const app = express()
const cors = require("cors")
const emailCheckUpper = require("./functions/superfunctions/emailCheckUpper.js")
const firstnameCheckUpper = require("./functions/superfunctions/firstnameCheckUpper.js")
const lastnameCheckUpper = require("./functions/superfunctions/lastnameCheckUpper.js")
const passwordCheckUpper = require("./functions/superfunctions/passwordCheckUpper.js")
const confirmPasswordCheckUpper = require("./functions/superfunctions/confirmPasswordCheckUpper.js")
const db = require("./db/database.js");



const PORT = process.env.PORT || 3500
const testPort = 3500
// Cross Origin Allowed
app.use(cors())
// Can extract URLparams
app.use(express.urlencoded({ extended:true }))
// Can extract body from incomming post etc. requests
app.use(express.json())


// db.execute("SELECT * FROM railway.iamtest").then(response => console.log(response)).catch(err => console.log(err))

// Homepage API redirect
app.get("/", (req, res) => {
    res.send("<a href='http://localhost:3000'>You seem lost friend 👀</a>")
    res.end()
})


// POST signup
app.post("/signup", (req, res) => {
    let reqObject = req.body
    // console.log(reqObject)

    Promise.allSettled([
        emailCheckUpper(reqObject.email),
        firstnameCheckUpper(reqObject.firstname),
        lastnameCheckUpper(reqObject.lastname),
        passwordCheckUpper(reqObject.password),
        confirmPasswordCheckUpper(reqObject.password, reqObject.confirmPassword)
    ])
    .then((response) => {
        const countToRedirect = response.filter((res) => {
            return res.status === "rejected"
        })
        if (countToRedirect.length === 0) { console.log("Time to redirect!") }
        console.log("Response: ", response)
        res.send(response)
        res.end()
    })
    .catch((err) => {
        console.log("Error: ", err)
        res.send(err)
        res.end()
    })

})

app.listen(PORT, () => {
    console.log("App started, started listening")
})