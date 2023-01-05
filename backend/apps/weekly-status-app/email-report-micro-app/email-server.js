const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const routerSendEmail = require("./router/sendMail")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerSendEmail)

app.listen(8090, () => {
  console.log(
    "weekly status email server listening on port: ".green + "8090".blue
  )
})
