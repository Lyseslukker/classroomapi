const express = require("express")
const app = express()
const fs = require("fs")
const cors = require("cors")
const cookieParser = require("cookie-parser")
// const cookieSession = require("cookie-session")
const validator = require("validator").default;
const { performance } = require("perf_hooks")
// 
// const compression = require("compression")
const rootdir = require("./rootdir")
const emailCheckUpper = require("./functions/superfunctions/emailCheckUpper.js")
const firstnameCheckUpper = require("./functions/superfunctions/firstnameCheckUpper.js")
const lastnameCheckUpper = require("./functions/superfunctions/lastnameCheckUpper.js")
const passwordCheckUpper = require("./functions/superfunctions/passwordCheckUpper.js")
const confirmPasswordCheckUpper = require("./functions/superfunctions/confirmPasswordCheckUpper.js")
const db = require("./db/database.js");
const createNewUser = require("./functions/db/createNewUser.js")
const { postSignup } = require("./controllers/Signup/postSignup.js")
const createFakeIdObject = require("./functions/fakedb/createFakeIdObject.js")


const PORT = process.env.PORT || 3500
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







// const tempFunction = () => {
//     const start = performance.now()
//     console.log("Start: ", start)
//     return db.execute("SELECT * FROM railway.iamtest")
//         .then((response) => {
//             const end = performance.now()
//             console.log("End: ", end)
//             console.log("Total time: ", end - start)
//             console.log(response[0])
//         })
//         .catch((err) => {
//             console.log(err)
//         })

// }
// tempFunction()

// // VALIDATOR
// let strongPassword = validator.isStrongPassword("Jegersej123!")
// let isRealEmail = validator.isEmail("sonny@gmail.com")
// let isANumber = validator.isInt("123")





// Homepage API redirect
app.get("/", (req, res) => {
    res.send("<a href='http://localhost:3000'>You seem lost friend 👀</a>")
    res.end()
})

// POST signup ( DONE )
app.post("/signup", (req, res) => {
    let reqObject = req.body
    console.log(reqObject)

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
            createNewUser(reqObject.email, reqObject.firstname, reqObject.lastname, reqObject.password, reqObject.role)
                .then((response) => {
                    res.send(response)
                    res.end()
                })
                .catch((err) => {
                    res.send(err)
                    res.end()
                })
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
    const requestEmail = req.body.credentials.email
    const requestPassword = req.body.credentials.password
    const requestScreenWidth = req.body.screen.width
    // const requestScreenAngle = req.body.screen.angle
    const requestClientDate = req.body.clientTimeObject
    // console.log(requestClientDate)

    const isEmail = validator.isEmail(requestEmail)
    
    if (!isEmail) {
        res.send({ status: "rejected", reason: "Not a real email!" })
    }
    if (isEmail) {
        createFakeIdObject(requestClientDate, requestScreenWidth, requestEmail, requestPassword)
            .then((finalObject) => {
                // console.log(finalObject)

                fs.readFile(`${rootdir()}/db/fakedb.json`, 'utf-8', (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    if (!err) {
                        const fakedb = JSON.parse(data)
                        fakedb.push(finalObject)
                        const stringedFakedb = JSON.stringify(fakedb)
                        // console.log(finalObject)
                        fs.writeFile(`${rootdir()}/db/fakedb.json`, stringedFakedb, (err) => {
                            if (err) {
                                console.log(err)
                                res.send({status: "rejected"})
                                res.end()
                            }
                            if (!err) {
                                console.log("Success!")
                                // console.log(finalObject)

                                res.cookie("id", finalObject.tempid, {
                                    maxAge: requestClientDate.clientCookieMaxAge,
                                    httpOnly: true,
                                    sameSite: "strict",
                                    path: "http://localhost:3500"
                                })
                                res.send({
                                    status: "fulfilled",
                                    csrf: finalObject.csrf,
                                    redirect: true
                                })
                                res.end()
                            }
                        })
                    }
                })
            })
    }


})

// GET home
app.get("/home", (req, res) => {
    const clientCookie = req.cookies
    // console.log("Client Cookie: ", clientCookie)
    const clientCSRF = req.headers.csrf
    // console.log("Client CSRF: ", clientCSRF)

    fs.readFile(`${rootdir()}/db/fakedb.json`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        if (!err) {
            const fakedb = JSON.parse(data)
            // console.log("Parsed fakedb: ", fakedb)
            const isFound = fakedb.filter((user) => {
                return user.csrf === clientCSRF && user.tempid === clientCookie.id ? user : false
            })
            console.log(isFound)
            if (isFound.length === 0) {
                res.send({status: "rejected"})
                res.end()
            }
            if (isFound.length === 1) {
                res.send({status: "fulfilled"})
                res.end()
            }
        }
    })


})

app.post("/createclass", (req, res) => {
    
})








app.listen(PORT, () => {
    console.log("App started, started listening")
})