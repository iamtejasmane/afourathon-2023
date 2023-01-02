const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const nodemailer = require("nodemailer")
const cron = require("node-cron")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.listen(8080, () => {
  console.log(
    "daily status email server listening on port: ".green + "8080".blue
  )
})
