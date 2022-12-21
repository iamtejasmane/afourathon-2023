const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.listen(8000, ()=> {
    console.log("project server listening on port 8000")
})