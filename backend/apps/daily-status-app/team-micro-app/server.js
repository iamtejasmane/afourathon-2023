const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerTeams = require("./routes/team")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerTeams)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(8012, () => {
  console.log("teams server is listening on port: ".green + "8012".blue)
})
