const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const jwt = require("jsonwebtoken")

const routerEmployee = require("./routes/employee")
const routerAdmin = require("./routes/admin")
require("dotenv").config()

const secret = process.env.SECRET

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

/**
 * 
 * @description this is authentication middleware 
 
// add middleware to extract token
app.use((request, response, next) => {
  if (
    request.url === "/employee/signup" ||
    request.url === "/employee/signin"
  ) {
    next()
  } else {
    const token = request.headers["token"]
    if (!token || token.length === 0) {
      response.send(utils.createResult("token is missing"))
    } else {
      try {
        // extract the employee id from token
        const payload = jwt.verify(token, secret)

        // add the employee id to the request so that
        // all the other requests can use it
        request.userId = payload.id

        next()
      } catch (ex) {
        response.send(utils.createResult("invalid token"))
      }
    }
  }
})

*/
app.use(routerEmployee)
app.use(routerAdmin)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

// backlog: pass port as env variable
app.listen(8004, () => {
  console.log("employee server listening on port:".green + "8004".blue)
})
