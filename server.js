const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
// const cookieSession = require("cookie-session")
// const compression = require("compression")

const emailCheckUpper = require("./functions/superfunctions/emailCheckUpper.js")
const firstnameCheckUpper = require("./functions/superfunctions/firstnameCheckUpper.js")
const lastnameCheckUpper = require("./functions/superfunctions/lastnameCheckUpper.js")
const passwordCheckUpper = require("./functions/superfunctions/passwordCheckUpper.js")
const confirmPasswordCheckUpper = require("./functions/superfunctions/confirmPasswordCheckUpper.js")
const db = require("./db/database.js");
const { postSignup } = require("./controllers/Signup/postSignup.js")
const loginCheckUpper = require("./functions/superfunctions/loginCheckUpper.js")


const PORT = process.env.PORT || 3500
console.log()
const testPort = 3500
// Cross Origin Allowed
app.use(cors({
    origin: ["http://localhost:3500/*", "http://127.0.0.1:3500/*", "http://localhost:3000/*"],
    credentials: true
}))
// Can extract URLparams
app.use(express.urlencoded({ extended:true }))
// Can extract body from incomming post etc. requests
app.use(express.json())
app.use(cookieParser())






const tempFunction = () => {
    const start = performance.now()
    console.log("Start: ", start)
    return db.execute("SELECT * FROM railway.iamtest")
        .then((response) => {
            const end = performance.now()
            console.log("End: ", end)
            console.log("Total time: ", end - start)
            console.log(response[0])
        })
        .catch((err) => {
            console.log(err)
        })

}
// tempFunction()




// Homepage API redirect
app.get("/", (req, res) => {
    res.send("<a href='http://localhost:3000'>You seem lost friend 👀</a>")
    res.end()
})

app.get("/test", postSignup)


// POST signup
app.post("/signup", (req, res) => {
    let reqObject = req.body

    // Promise.allSettled([
    //     emailCheckUpper(reqObject.email),
    //     firstnameCheckUpper(reqObject.firstname),
    //     lastnameCheckUpper(reqObject.lastname),
    //     passwordCheckUpper(reqObject.password),
    //     confirmPasswordCheckUpper(reqObject.password, reqObject.confirmPassword)
    // ])
    // .then((response) => {
    //     const countToRedirect = response.filter((res) => {
    //         return res.status === "rejected"
    //     })
    //     if (countToRedirect.length === 0) { 
    //         console.log("Time to redirect!") 
    //         db.execute('INSERT INTO users (email, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)', 
    //         [reqObject.email, reqObject.firstname, reqObject.lastname, reqObject.password, reqObject.role])
    //         res.send(response)
    //         res.end()
    //     }
    //     if (countToRedirect.length !== 0) {
    //         console.log("Something went wrong, sending errors!")
    //         res.send(response)
    //         res.end()
    //     }
    // })
    // .catch((err) => {
    //     console.log("Error: ", err)
    //     res.send(err)
    //     res.end()
    // })

})

// POST login
app.post("/login", (req, res) => {
    // console.log(req.body)
    // loginCheckUpper(req.body.email, req.body.password)
    //     .then((response) => {
    //         res.cookie('mysql', '22', {

    //         })
    //         res.send({
    //             status: "rejected",
    //             reason: "User not found"
    //         })
    //     })
    //     .catch((error) => {
    //         res.send({
    //             status: "rejected",
    //             reason: "User not found"
    //         })
    //         console.log("Error: ", error)
    //     })
})

app.listen(PORT, () => {
    console.log("App started, started listening")
})