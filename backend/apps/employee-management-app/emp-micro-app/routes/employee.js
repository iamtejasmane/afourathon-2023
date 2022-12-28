const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// get employee details api
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

// add new employee details api
router.post("/employees", (req, res) => {
  const { first_name, last_name, gender, email, password, mobile } = req.body

  Employees.create({
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    email: email,
    password: password,
    mobile: mobile,
  })
})

// update employee information api
router.put("/employees/:id", (req, res) => {
  Employees.findByPk(req.params.id)
    .then((employee) => {
      employee.update(req.body)
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

module.exports = router
