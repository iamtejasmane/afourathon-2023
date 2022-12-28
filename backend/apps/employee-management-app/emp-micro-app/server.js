const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerEmployee = require("./routes/employee")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerEmployee)

// backlog: pass port as env variable
app.listen(8004, () => {
  console.log("employee server listening on port:".green + "8004".blue)
})
