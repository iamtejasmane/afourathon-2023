const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerProject = require("./routes/project")
const routerWeeklyStatusEMails = require("./routes/weeklyStatusEmails")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

// Comment the project router line if project app of the daily status app
// is running on the same port number
app.use(routerProject)
app.use(routerWeeklyStatusEMails)

app.listen(8020, () => {
  console.log(
    "weekly status project server is listening on port: ".green + "8020".blue
  )
})
