const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

router.get("/employees", (req, res) => {
  Employees.findAll()
    .then((employees) => {
      res.send(utils.createResult(null, employees))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.get("/employees/:id", (req, res) => {
  const emp_id = req.params.id

  Projects.findAll({ where: { emp_id: emp_id } })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.post("/employees", (req, res) => {})

module.exports = router
