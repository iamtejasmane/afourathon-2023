const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const routerStatus = require("./routes/dailyStatus")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

app.use(routerStatus)

// this is a simple health monitoring api
app.get("/health-check", (req, res) => {
  res.send("OK")
})

app.listen(8016, () => {
  console.log("status server listening on port: ".green + "8016".blue)
})
