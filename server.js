const express = require("express")
const app = express()

const PORT = process.env.PORT || 3500


app.get("/", (req, res) => {
    res.send("<h1>Hi</h1>")
    res.end()
})




app.listen(PORT, () => {
    console.log("App started, started listening")
})