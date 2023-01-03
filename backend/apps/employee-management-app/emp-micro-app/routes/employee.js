const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// get employee details api
router.get("/employees/:id", (req, res) => {
  const emp_id = req.params.id

  Employees.findAll({ where: { emp_id: emp_id } })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// get all employess in a team
// id: team id
router.get("/employee-team/id", (req, res) => {
  const team_id = req.params.id

  Employees.findAll({ where: { team_id: team_id } })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
// add new employee details api
router.post("/employees", (req, res) => {
  const { first_name, last_name, gender, email, password, mobile, is_admin } =
    req.body

  Employees.create({
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    email: email,
    password: password,
    mobile: mobile,
    is_admin: is_admin,
  })
    .then((employees) => {
      res.send(utils.createResult(null, employees))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// update employee information api
// id: employee id to be updated
router.put("/employees/:id", (req, res) => {
  const emp_id = req.params.id
  Employees.findByPk(emp_id)
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
