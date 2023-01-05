const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerProject = require("./routes/project")
const routerDailyStatusEmails = require("./routes/dailyStatusEmails")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerProject)
app.use(routerDailyStatusEmails)

app.listen(8080, () => {
  console.log("project server is listening on port: ".green + "8000".blue)
})
