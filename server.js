const express = require("express")
const app = express()


app.get("/", (req, res) => {
    res.send("<h1>Hi</h1>")
    res.end()
})




app.listen(4500, () => {
    console.log("Listning on port 4500")
})