const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerEmployeeSkills = require("./routes/employee-skills")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerEmployeeSkills)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(8038, () => {
  console.log("skills report server is listening on port: ".green + "8038".blue)
})
