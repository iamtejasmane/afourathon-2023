const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// router.use(async (req, res, next) => {
//   const { id } = req.params
//   console.log(id)
//   const employee = await Employees.findOne({ where: { emp_id: id } })

// router.use(async (req, res, next) => {
//   const { id } = req.params
//   console.log(id)
//   const employee = await Employees.findOne({ where: { emp_id: id } })

//   if (employee.is_admin == true) {
//     next()
//   } else {
//     res.status(403).send({
//       status: "error",
//       message: "You don't have permissions",
//     })
//   }
// })
//   if (employee.is_admin == true) {
//     next()
//   } else {
//     res.status(403).send({
//       status: "error",
//       message: "You don't have permissions",
//     })
//   }
// })
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
