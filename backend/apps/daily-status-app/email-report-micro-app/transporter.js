const nodemailer = require("nodemailer")
require("dotenv").config()

// get the user and passwrod from the environment variable
const user = process.env.USER
const pass = process.env.PASSWORD

// Mail transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

module.exports = transporter
