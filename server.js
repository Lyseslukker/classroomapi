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
const createUUID = require("./functions/db/createUUID.js")
const db = require("./db/database.js");
const { postSignup } = require("./controllers/Signup/postSignup.js")
const loginCheckUpper = require("./functions/Login/loginCheckUpper.js")


const PORT = process.env.PORT || 3500
console.log()
const testPort = 3500
// Cross Origin Allowed
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
// Can extract URLparams
app.use(express.urlencoded({ extended:true }))
// Can extract body from incomming post etc. requests
app.use(express.json())






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
        if (countToRedirect.length === 0) { 
            console.log("Time to redirect!") 
            db.execute('INSERT INTO users (email, firstname, lastname, password, role) VALUES (?, ?, ?, ?, ?)', 
            [reqObject.email, reqObject.firstname, reqObject.lastname, reqObject.password, reqObject.role])
            res.send(response)
            res.end()
        }
        if (countToRedirect.length !== 0) {
            console.log("Something went wrong, sending errors!")
            res.send(response)
            res.end()
        }
    })
    .catch((err) => {
        console.log("Error: ", err)
        res.send(err)
        res.end()
    })

})

// POST login
app.post("/login", (req, res) => {
    console.log(req.body)
    console.log(req.cookies)
    // res.cookie('s', 'w');
    loginCheckUpper(req.body.email, req.body.password)
        .then((response) => {
            console.log("Login Checkup: ", response)

            // NOT FOUND!
            if (response.length === 0) {
                res.send({ status: "rejected", reason: "No user with that email and password exists." })
            }

            // FOUND!
            if (response.length === 1) {
                // console.log("id: ", response[0].id)
                createUUID(response[0].id)
                    .then((uuid) => {
                        let cookieID = {
                            id: uuid,
                            name: response[0].firstname
                        }
                        const stringifyCookieID = JSON.stringify(cookieID)

                        console.log("New uuid: ", stringifyCookieID)
                        res.cookie("classroomid", stringifyCookieID, {
                            maxAge: "300000"
                        })
                        res.send({ status: "fulfilled", tempid: uuid })
                    })
                    .catch((err) => {
                        res.send({status: "rejected", reason: err})
                    })
            }
        })
        .catch((error) => {
            console.log("Error: ", error)
        })
})

app.get("/login", (req, res) => {
    console.log(req.cookies.length)
    res.cookie("hej", "you", { maxAge: "300000" })
    res.send({status: "none"})
    res.end()
})

app.listen(PORT, () => {
    console.log("App started, started listening")
})