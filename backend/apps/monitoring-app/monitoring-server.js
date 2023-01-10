const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cron = require("node-cron")
const transporter = require("./transporter")
const axios = require("axios")
const colors = require("colors")
require("dotenv").config()

colors.enable()

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

const fromEmail = process.env.EMAILFROM
const serverHost = process.env.SERVER_HOST
const serverPorts = process.env.SERVER_PORTS.split(" ")
const adminEmail = process.env.ADMIN_EMAIL

// Delivering mail with sendMail method

cron.schedule("* * * * *", async function () {
  console.log("---------------------".green)
  console.log("Running Cron Process".green)

  for (i = 0; i < serverPorts.length; i++) {
    try {
      console.log(serverHost + serverPorts[i] + "/health-check")
      const result = await axios.get(
        serverHost + serverPorts[i] + "/health-check"
      )
      // console.log(result)
      console.log("health check passed!".green)
    } catch (err) {
      console.log("The server is unhealthy and not running!".red)
      let mailOptions = {
        from: fromEmail,
        to: adminEmail,
        subject: "Server Down!",
        text: "Server is unhealthy and not running!",
        html: `<b> ${
          serverHost + serverPorts[i]
        } is down! actions required!  <b>`,
        // console.log(err)
      }
      // Delivering mail with sendMail method
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error)
        else console.log(`Email sent to admin`.green + info.response.green)
      })
    }
  }
})

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(9090, () => {
  console.log("monitoring server listening on port: ".green + "9090".blue)
})
