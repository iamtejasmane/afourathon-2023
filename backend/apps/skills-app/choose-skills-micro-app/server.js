const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerSkillsMapping = require("./routes/skills-mapping")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerSkillsMapping)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(8034, () => {
  console.log("choose skill server is listening on port: ".green + "8034".blue)
})
