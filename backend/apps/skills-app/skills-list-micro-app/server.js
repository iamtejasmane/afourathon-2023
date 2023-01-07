const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerDomain = require("./routes/domain")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerDomain)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(8030, () => {
  console.log("skill server is listening on port: ".green + "8030".blue)
})
